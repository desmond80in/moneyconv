import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";

const styles = (theme) => ({
  root: {
    color: "black",
  },
});

class ConverterPage extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <h1>Converter Page Component</h1>
      </div>
    );
  }
}

ConverterPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConverterPage);
