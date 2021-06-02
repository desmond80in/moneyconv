import { TextField, Typography, Box, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";

const useStyles = makeStyles((theme) => ({
  currencyData: {
    justifyContent: "flex-end",
    textAlign: "right",
    alignItems: "flex-end",
  },
  column: {
    paddingLeft: 10,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function CurrencyDetail({ currencyData }) {
  const [amount, setAmount] = useState("0");
  const [converted, setConverted] = useState(0);
  const [baseCurrency] = useState(
    currencyData.base ? currencyData.base : "SEK"
  );

  const classes = useStyles();
  useEffect(() => {
    console.log("useEffect ", amount, currencyData.r);
    // Update the document title using the browser API
    setConverted(parseFloat(amount.replace(/,/g, "")) * currencyData.r);
  }, [amount, currencyData.r]);

  const handleChange = (e) => {
    e.preventDefault();
    const target = e.target;
    console.log("target.vale", target.value);
    setAmount(target.value);
  };

  console.log("CurrencyDetail", currencyData);
  return (
    <Grid container className={classes.currencyData}>
      <Grid item xs={12} sm={6} md={4} className={classes.column}>
        <Typography variant="h6">
          {`${currencyData.c} ${currencyData.s ? currencyData.s : ""} ${
            currencyData.r
          }`}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} className={classes.column}>
        <CurrencyTextField
          label={`Enter Amount`}
          variant="standard"
          outputFormat="string"
          currencySymbol={baseCurrency}
          value={amount}
          decimalCharacter="."
          digitGroupSeparator=","
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} className={classes.column}>
        <CurrencyTextField
          label={`Convertion`}
          variant="standard"
          outputFormat="string"
          currencySymbol={currencyData.c}
          value={converted}
          decimalCharacter="."
          InputProps={{
            readOnly: true,
          }}
          digitGroupSeparator=","
          onChange={(e) => handleChange(e)}
        />
      </Grid>
    </Grid>
  );
}
