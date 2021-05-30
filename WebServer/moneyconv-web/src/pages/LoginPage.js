import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import { Typography, Grid, Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { loginPost } from "../redux/actions/authActions";
import compose from "recompose/compose";
const styles = (theme) => ({
  root: {
    color: "black",
    display: "flex",
    flexDirection: "column",
  },
  subTitle: {
    marginBottom: "10vh",
  },
  title: {},
  inputText: {
    paddingBottom: 10,
  },
  signinButton: {
    marginTop: 10,
  },
});

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      password: "",
      isLoggedIn: false,
    };
    this.handleLogin = this.handleLogin.bind(this);

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProp) {
    if (
      prevProp !== this.props &&
      this.props &&
      this.props.auth &&
      this.props.auth.isLoggedIn
    ) {
      const { history } = this.props;
      if (history) history.push("/");
    }
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  }

  handleLogin = (event) => {
    event.preventDefault();

    this.props.loginPost({
      username: this.state.userName,
      password: this.state.password,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "80vh" }}
      >
        <Grid item xs={3}>
          <form onSubmit={this.handleLogin}>
            <div className={classes.root}>
              <Typography variant="h4" className={classes.title}>
                Welcome Back
              </Typography>
              <Typography variant="subtitle2" className={classes.subTitle}>
                Sign in to send money faster to your loved once.
              </Typography>

              <TextField
                id="userName"
                name="userName"
                value={this.state.userName}
                onChange={this.handleChange}
                className={classes.inputText}
                required
                label="Email"
                variant="outlined"
              />

              <TextField
                id="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                required
                label="Password"
                variant="outlined"
                type="password"
              />
              <Button
                fullWidth
                variant="contained"
                className={classes.signinButton}
                color="primary"
                type="submit"
              >
                Sign in {this.props.auth.isLoggedIn ? "true" : "false"}
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    );
  }
}

// const mapStatesToProps = (state) => ({
//   auth: state.auth,
// });

const mapStatesToProps = (state) => {
  return {
    auth: state.auth,
  };
};

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  loginPost: PropTypes.func.isRequired,
  auth: PropTypes.object,
};

export default compose(
  withStyles(styles),
  connect(mapStatesToProps, { loginPost })
)(withRouter(LoginPage));
