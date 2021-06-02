import React from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useSelector, useDispatch } from "react-redux";

import { getCountryDetail } from "../redux/actions/gqlActions";

export default function SearchByCountries() {
  const countryNames = useSelector((state) => state.gql.countryNames);
  const filteredCountries = useSelector((state) => state.gql.filteredCountries);

  const dispatch = useDispatch();
  const handleChange = (event, value, reason, detail) => {
    //keeps adding item until the limit hits 5 and replace the last tiem with the new item
    if (reason && reason === "select-option" && value.length === 6) {
      value.splice(4, 1);
    }

    dispatch(getCountryDetail({ value: detail && detail.option, reason }));
  };
  return countryNames ? (
    <Autocomplete
      multiple
      id="tags-standard"
      options={countryNames}
      getOptionLabel={(option) => option.n}
      defaultValue={filteredCountries.map((item) => ({ n: item.n, c: item.c }))}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label="Countries"
          placeholder="Select a country"
        />
      )}
    />
  ) : (
    <div></div>
  );
}
