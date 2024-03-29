import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";

import styles from "./index.less";

const BasicLayout = () => {
  return (
    <div className={styles.basic__layout}>
      <Header />
      <div className={styles.content}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default BasicLayout;
