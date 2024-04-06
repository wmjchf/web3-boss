import React from "react";
import { Search } from "./components/Search";
import { Result } from "./components/Result";
import styles from "./index.less";
import { useSearchParams } from "react-router-dom";

export const Jobs = () => {
  const [searchParams] = useSearchParams();
  const address = searchParams.get("address");
  address && localStorage.setItem("address", address);
  return (
    <div className={styles.jobs}>
      <Search></Search>
      <Result></Result>
    </div>
  );
};
