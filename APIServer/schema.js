
import { gql } from 'apollo-server-express';


export default gql`

directive @deprecated(
  reason: String = "No longer supported"
) on FIELD_DEFINITION | ENUM_VALUE


type Currency {
  c: String
  n: String
  s: String
  r: Float
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
  hello: String @deprecated(reason: "Use 'newField'.")
  getCountries(keys: [String]): [Country] 
  getCurrecies: [Currency]
}

type Mutation {
  setCountry(key: String!, value:  String!): Boolean!
}
`;