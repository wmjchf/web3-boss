import React from "react";
import { Header } from "./components/Header";

import styles from "./index.less";

const BasicLayout = () => {
  return (
    <div className={styles.basic__layout}>
      <Header />
    </div>
  );
};

export default BasicLayout;
