import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import { Box, Paper, Typography } from "@material-ui/core";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import compose from "recompose/compose";

import { getCountryList } from "../redux/actions/gqlActions";
import SearchByCountries from "../components/searchByCountries";
import FilteredCountryList from "../components/filterCountryList";

const styles = (theme) => ({
  root: {
    color: "black",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/bg.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    "@media (max-width: 600px)": {
      backgroundSize: "150%",
      backgroundPosition: "-70px 0px",
    },
    "@media (min-width: 1200px)": {
      backgroundPosition: "0px -35vh",
    },
  },
  landingCotainer: {
    paddingTop: 50,
    display: "flex",
    flexDirection: "column",
    height: "90vh",
  },
  centerBox: {
    background: "rgba(0,0,0,0.8)",
    padding: 30,
    display: "flex",
    flexDirection: "column",
    alignCenter: "center",
  },
  lastUpdates: {
    marginTop: -20,
    alignSelf: "flex-end",
    color: "white",
  },
  countrySearch: {
    marginTop: 20,
  },
});

class CurrencyConverter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryNames: [],
      gql: {},
    };
  }

  componentDidMount() {
    this.props.getCountryList();
  }

  render() {
    const { classes } = this.props;
    return (
      this.props.auth.isLoggedIn && (
        <div>
          <Paper elevation={0} className={classes.centerBox}>
            <Typography varient="body1" className={classes.lastUpdates}>
              Last updated on 01/22/2021 11:00:00 GMT
            </Typography>
            <Box className={classes.countrySearch}>
              <SearchByCountries></SearchByCountries>
            </Box>
            <FilteredCountryList></FilteredCountryList>
          </Paper>
        </div>
      )
    );
  }
}

const mapStatesToProps = (state) => {
  return {
    auth: state.auth,
    gql: state.gql,
  };
};

CurrencyConverter.propTypes = {
  classes: PropTypes.object.isRequired,
  getCountryList: PropTypes.func.isRequired,
  gql: PropTypes.object,
};

export default compose(
  withStyles(styles),
  connect(mapStatesToProps, { getCountryList })
)(withRouter(CurrencyConverter));
