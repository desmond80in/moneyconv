import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import {
  Box,
  Container,
  Input,
  Paper,
  TextField,
  Typography,
  Grid,
} from "@material-ui/core";

import CurrencyConverter from "../components/currencyConverter";
const styles = (theme) => ({
  root: {
    color: "black",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/bg.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    "@media (max-width: 600px)": {
      backgroundSize: "150%",
      backgroundPosition: "-70px 0px",
      // transform: "scale(1.5)",
    },
    "@media (min-width: 1200px)": {
      backgroundPosition: "0px -35vh",
      // transform: "scale(1.5)",
    },
  },
  landingCotainer: {
    paddingTop: 50,
    display: "flex",
    flexDirection: "column",
    height: "90vh",
    alignItems: "center",
  },
  cnerterBox: {
    background: "red",
    maxWidth: 500,
  },
});

class LandingPage extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Container className={classes.landingCotainer}>
          <Typography variant="h3">Exchange Money Internationally</Typography>
          <Typography variant="subtitle2">
            We’re the experts in sending money across borders
          </Typography>

          <Grid container justify="center">
            <Grid item xs={12} md={8}>
              <CurrencyConverter></CurrencyConverter>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingPage);
