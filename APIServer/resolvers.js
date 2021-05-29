
import fetch from 'node-fetch';


export default  {
  Query: {
    hello: () => 'Hello world!',
    getCountries: async (parent, {keys},{auth,redis})=> {
      try{       
        if(!auth || !auth.isAuth){
          return null;
        }
        //if keys has values for countries the get specific country values 
        if(keys){
          let countryResult = [];
          await Promise.all(keys.map( async(item) => {
            console.log('county', item)
            const nameResult = await fetch(`https://restcountries.eu/rest/v2/name/${item}`);
            const json = await nameResult.json()
            if(nameResult){
              json.forEach(cItem=>{
                countryResult.push({
                  n: cItem.name,
                  c: cItem.alpha3Code,
                  polulation: cItem.population,
                  currencies: cItem.currencies && cItem.currencies.map(curr=> ({
                    c:curr.code,
                    n:curr.name,
                    s:curr.symbol,
                  })),
                  flag: cItem.flag
                })              
              })
            }
          }));
          return countryResult
        }

        const key = 'ac-country-list';
        //check if redis has value for key
        let countryVals = await redis.get(key);
        if(!countryVals) {
          const respoonse = await fetch('https://restcountries.eu/rest/v2/all');
          const json = await respoonse.json();  
          const countryList = [];
          json.forEach(country=> {
            countryList.push({
              c: country.alpha3Code,
              n: country.name,
              a: `${country.name} ${country.altSpellings && country.altSpellings.toString()}`
            })
          })
          
          //convert the value as string and cache the result 
          await redis.set(key,JSON.stringify(countryList));
          return countryList;
        }
        return JSON.parse(countryVals);
      }catch(error){
        console.log('error', error)
        return null;
      }
    },

    getCurrecies: async (parent, {}, {redis}) =>{
      try{
        const key = 'ac-list';
        //check if redis has value for key
        let currencyVals = await redis.get(key);
        if(!currencyVals) {
          //get all currencies used by the country 
          const respoonse = await fetch('https://restcountries.eu/rest/v2/all');
          const json = await respoonse.json();  
          const currencyList = [];
          
          //need to optimize the code
          //get distinct value of them 
          json.forEach(country => {
            country.currencies.forEach(currency => {
              let item = {
                c:currency.code,
                n:currency.name,
                s:currency.symbol,
              };
              currencyList.findIndex(v=> v.c === item.c) === -1 && currencyList.push(item)
            });
          });
                 
          //convert the value as string and cache the result 
          await redis.set(key,JSON.stringify(currencyList));
          return currencyList;
        }
        return JSON.parse(currencyVals);
      }catch(error){
        console.log('error', error)
        return null;
      }
    }
  },
  Mutation: {
    setCountry: async (parent, {key, value}, {redis}) => {
      try {
        await redis.set(key, value)
        console.log('after set')
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    }
  }
};