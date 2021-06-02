import { combineReducers } from "redux";
import authReducer from "./authReducer";
import gqlReducer from "./gqlReducer";

export default combineReducers({
  auth: authReducer,
  gql: gqlReducer,
});
