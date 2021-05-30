import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import blueGrey from "@material-ui/core/colors/blueGrey";
import red from "@material-ui/core/colors/red";

import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { useSelector, useDispatch } from "react-redux";

import { LOGOUT_ACTION } from "../redux/actions/types";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: blueGrey,
  },
  appbarWrapper: {
    width: "80%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appbar: {
    background: "#F1FAEE",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    // flexGrow: 1,
    marginRight: theme.spacing(2),
    color: red[400],
    fontFamily: "Redressed",
  },
  registerButton: {
    borderRadius: "20px",
  },
  loginButton: {
    color: "back",
  },
  home: {
    textDecoration: "none !important",
  },
}));

export default function Headder() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.appbarWrapper}>
          <Link component={RouterLink} to="/" className={classes.home}>
            <Typography edge="start" variant="h4" className={classes.title}>
              MoneyConv
            </Typography>
          </Link>
          <div>
            {!auth.isLoggedIn && (
              <div>
                <Button
                  className={classes.loginButton}
                  component={RouterLink}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.registerButton}
                  component={RouterLink}
                  to="/register"
                >
                  Register
                </Button>
              </div>
            )}
            {auth.isLoggedIn && (
              <Button
                className={classes.loginButton}
                onClick={() => dispatch({ type: LOGOUT_ACTION })}
              >
                Logout
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
