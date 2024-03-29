import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import styles from "./index.less";

export const Search = () => {
  const currencies = [
    {
      value: "USD",
      label: "$",
    },
    {
      value: "EUR",
      label: "€",
    },
    {
      value: "BTC",
      label: "฿",
    },
    {
      value: "JPY",
      label: "¥",
    },
  ];

  return (
    <div className={styles.search}>
      <div className={styles.keyword}>
        <TextField id="keyword" label="关键字" fullWidth />
      </div>
      <div className={styles.type}>
        <TextField id="type" label="岗位" fullWidth />
      </div>
      <div className={styles.city}>
        <TextField id="city" label="城市" select fullWidth>
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </div>
  );
};
