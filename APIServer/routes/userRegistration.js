
const crypto = require('crypto');


export default async(req,res,redis) => {  
    const user = req.body;
  
    if(!user.password || !user.username ){
      return res.status(400).send({message: 'Invalid user data'});
    }
    
    let userResult = await redis.get(user.username);
    if(userResult){
      return res.status(401).send({message: 'Username already exits'});
    }
  
    var hPassword = crypto.createHash('md5').update(user.password).digest("hex");
    console.log('hPassword', hPassword);
  
    await redis.set(user.username, hPassword);
    return res.status(201).send({message: "User created successfully"});
  
  }