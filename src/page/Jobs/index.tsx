import React from "react";
import { Search } from "./components/Search";
import { Result } from "./components/Result";
import styles from "./index.less";

export const Jobs = () => {
  return (
    <div className={styles.jobs}>
      <Search></Search>
      <Result></Result>
    </div>
  );
};
