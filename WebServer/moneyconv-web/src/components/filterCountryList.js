import React from "react";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
} from "@material-ui/core";
import CurrencyDetail from "./currencyDetail";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,.8)",
    borderRadius: 10,
    marginTop: 10,
  },
  inline: {
    display: "inline",
  },
  hiddenList: {
    display: "none",
  },
  listItemText: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
    justifyContent: "space-between",
    alignItems: "center",
  },
  currencyConv: {
    flexGrow: 1,
  },
  countryDetail: {
    minWidth: 150,
    maxWidth: 150,
  },
}));

export default function FilteredCountryList() {
  const filteredCountryList = useSelector(
    (state) => state.gql.filteredCountries
  );

  const classes = useStyles();

  const renderCountryList = () => {
    return filteredCountryList.map((item) => (
      <React.Fragment key={item.n}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={item.n} src={item.flag} />
          </ListItemAvatar>
          <ListItemText
            disableTypography={true}
            className={classes.listItemText}
            primary={
              <div className={classes.countryDetail}>
                <Typography variant="h5">{item.n}</Typography>
                <Typography variant="body1">
                  Population : {item.polulation}
                </Typography>
              </div>
            }
            secondary={
              <div className={classes.currencyConv}>
                {item.currencies &&
                  item.currencies.map((item, index) => (
                    <CurrencyDetail
                      key={index}
                      currencyData={item}
                    ></CurrencyDetail>
                  ))}
              </div>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </React.Fragment>
    ));
  };

  return (
    <List
      className={[
        classes.root,
        filteredCountryList.length === 0 && classes.hiddenList,
      ]}
    >
      {renderCountryList()}
    </List>
  );
}
