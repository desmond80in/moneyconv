import {
  COUNTRIES_FETCH,
  COUNTRY_FILTER_ADD,
  COUNTRY_FILTER_REMOVE,
  COUNTRY_FILTER_CLEAR,
  LOGOUT_ACTION,
} from "../actions/types";

const initialState = {
  countryNames: [],
  countryData: [],
  filteredCountries: [],
};

const gqlReducer = (state = initialState, action) => {
  console.log("gqlReducer ", action, state);

  switch (action.type) {
    case COUNTRIES_FETCH:
      return {
        ...state,
        countryNames: action.payload,
      };
    case COUNTRY_FILTER_ADD:
      return (
        action.payload && {
          ...state,
          filteredCountries: [...state.filteredCountries, action.payload],
        }
      );
    case COUNTRY_FILTER_REMOVE:
      state.filteredCountries.splice(
        state.filteredCountries.findIndex(
          (item) => item.n === action.payload.n
        ),
        1
      );
      return (
        action.payload && {
          ...state,
          filteredCountries: [...state.filteredCountries],
        }
      );
    case COUNTRY_FILTER_CLEAR:
      return {
        ...state,
        filteredCountryData: [],
      };

    case LOGOUT_ACTION:
      return {
        ...state,
        countryNames: [],
        countryData: [],
        filteredCountries: [],
      };
    default:
      return state;
  }
};

export default gqlReducer;
