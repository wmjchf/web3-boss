import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import styles from "./index.less";

export const Search = () => {
  const citys = [
    {
      value: "1",
      label: "北京",
    },
    {
      value: "2",
      label: "上海",
    },
    {
      value: "3",
      label: "深圳",
    },
    {
      value: "4",
      label: "杭州",
    },
  ];

  const types = [
    {
      value: "1",
      label: "是",
    },
    {
      value: "0",
      label: "否",
    },
  ];
  return (
    <div className={styles.search}>
      <div className={styles.keyword}>
        <TextField id="name" label="岗位名称" fullWidth />
      </div>
      <div className={styles.type}>
        <TextField id="type" label="是否远程" select fullWidth>
          {types.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className={styles.city}>
        <TextField id="location" label="地址" fullWidth />
      </div>
    </div>
  );
};
