import {
  LOGGED_IN_FAILURE_ACTION,
  LOGGED_IN_SUCCESS_ACTION,
  LOGOUT_ACTION,
} from "../actions/types";

const initialState = {
  isLoggedIn: false,
  token: null,
  userName: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN_SUCCESS_ACTION:
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
        userName: action.payload.userName,
      };
    case LOGGED_IN_FAILURE_ACTION:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        userName: null,
      };
    case LOGOUT_ACTION:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        userName: null,
      };
    default:
      return state;
  }
};

export default authReducer;
