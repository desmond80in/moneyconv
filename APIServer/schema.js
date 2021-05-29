
import { gql } from 'apollo-server-express';


export default gql`
type Currency {
  c: String
  n: String
  s: String
}

type Country {
  c: String
  n: String
  a: String
  polulation: Int
  currencies: [Currency]
  flag: String
}

type Query {
  hello: String
  getCountries(keys: [String]): [Country]
  getCurrecies: [Currency]
}

type Mutation {
  setCountry(key: String!, value:  String!): Boolean!
}
`;