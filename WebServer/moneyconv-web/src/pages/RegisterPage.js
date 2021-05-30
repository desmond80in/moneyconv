import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";

const styles = (theme) => ({
  root: {
    color: "black",
  },
});

class RegisterPage extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <h1>Registration Page component</h1>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterPage);
