import { LOGGED_IN_SUCCESS_ACTION, LOGGED_IN_FAILURE_ACTION } from "./types";

export const loginPost = (loginData) => (dispatch) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
  };
  fetch("http://localhost:4000/api/login", requestOptions)
    .then((res) => res.json())
    .then(
      (result) => {
        if (result.isAuth) {
          dispatch({
            type: LOGGED_IN_SUCCESS_ACTION,
            payload: {
              isLoggedIn: result.isAuth,
              token: result.token,
            },
          });
        } else {
          dispatch({
            type: LOGGED_IN_FAILURE_ACTION,
            payload: {
              isLoggedIn: result.isAuth,
            },
          });
        }
      },
      (error) => {
        dispatch({
          type: LOGGED_IN_FAILURE_ACTION,
          payload: {
            isLoggedIn: false,
          },
        });
      }
    );
};