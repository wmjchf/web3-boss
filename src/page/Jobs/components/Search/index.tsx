import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import styles from "./index.less";
import { useJobsStore } from "@/store";
import { Button } from "@mui/material";

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
  const {
    setName,
    setIsRemote,
    setLocation,
    name,
    location,
    isRemote,
    getJobList,
  } = useJobsStore();
  return (
    <div className={styles.search}>
      <div className={styles.keyword}>
        <TextField
          id="name"
          label="岗位名称"
          fullWidth
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </div>
      <div className={styles.type}>
        <TextField
          id="isRemote"
          label="是否远程"
          select
          fullWidth
          value={isRemote === false ? "0" : isRemote === true ? "1" : ""}
          onChange={(event) => {
            setIsRemote(event.target.value === "1" ? true : false);
          }}
        >
          {types.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className={styles.city}>
        <TextField
          id="location"
          label="地址"
          value={location}
          fullWidth
          onChange={(event) => {
            setLocation(event.target.value);
          }}
        />
      </div>
      <Button
        variant="contained"
        size="large"
        className={styles.search__btn}
        onClick={getJobList}
      >
        搜索
      </Button>
    </div>
  );
};
