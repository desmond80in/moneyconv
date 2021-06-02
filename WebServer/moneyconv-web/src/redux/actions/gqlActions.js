import {
  COUNTRIES_FETCH,
  LOGOUT_ACTION,
  COUNTRY_FILTER_ADD,
  COUNTRY_FILTER_REMOVE,
  COUNTRY_FILTER_CLEAR,
} from "./types";

import { gql } from "@apollo/react-hooks";

const GET_COUNTRIES = gql`
  query GetExchangeRates {
    getCountries {
      c
      n
    }
  }
`;

export const getCountryDetail =
  ({ value, reason }) =>
  async (dispatch, state, { client }) => {
    console.log("getCountryDetail", value, reason);

    switch (reason) {
      case "select-option":
        const GET_COUNTRY_DETAIL = gql`
          query {
            getCountries(keys: ["${value.n}"]) {
              c
              n
              flag
              polulation
              currencies {
                c
                n
                s
                r
              }
            }
          }
        `;

        try {
          const request = await client.query({
            query: GET_COUNTRY_DETAIL,
          });
          const data = await request;
          dispatch({
            type: COUNTRY_FILTER_ADD,
            payload: data.data.getCountries[0],
          });
        } catch (error) {
          console.log(error);
          if (
            error &&
            error.graphQLErrors &&
            error.graphQLErrors[0].extensions.code === "UNAUTHENTICATED"
          ) {
            //GraphQL has returned unauthenticated error need to call the LOGOUT action
            dispatch({ type: LOGOUT_ACTION });
          }
        }
        break;
      case "remove-option":
        try {
          dispatch({
            type: COUNTRY_FILTER_REMOVE,
            payload: value,
          });
        } catch (error) {
          console.log(error);
          if (
            error &&
            error.graphQLErrors &&
            error.graphQLErrors[0].extensions.code === "UNAUTHENTICATED"
          ) {
            //GraphQL has returned unauthenticated error need to call the LOGOUT action
            dispatch({ type: LOGOUT_ACTION });
          }
        }
        break;
      case "clear":
        try {
          dispatch({
            type: COUNTRY_FILTER_CLEAR,
          });
        } catch (error) {
          console.log(error);
          if (
            error &&
            error.graphQLErrors &&
            error.graphQLErrors[0].extensions.code === "UNAUTHENTICATED"
          ) {
            //GraphQL has returned unauthenticated error need to call the LOGOUT action
            dispatch({ type: LOGOUT_ACTION });
          }
        }
        break;
      default:
        break;
    }
  };

export const getCountryList =
  () =>
  async (dispatch, state, { client }) => {
    try {
      const request = await client.query({
        query: GET_COUNTRIES,
      });
      const data = await request;

      // console.log("data from getCountryList", data);

      const result =
        data.data &&
        data.data.getCountries &&
        data.data.getCountries.map(({ c, n }) => ({ c, n }));

      dispatch({
        type: COUNTRIES_FETCH,
        payload: result,
      });
    } catch (error) {
      if (
        error &&
        error.graphQLErrors &&
        error.graphQLErrors[0].extensions.code === "UNAUTHENTICATED"
      ) {
        //GraphQL has returned unauthenticated error need to call the LOGOUT action
        dispatch({ type: LOGOUT_ACTION });
      }
    }
  };
