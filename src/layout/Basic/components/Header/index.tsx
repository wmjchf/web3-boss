import React from "react";
import Button from "@mui/material/Button";
import styles from "./index.less";

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <div className={styles.placeholder}></div>
      </div>
      <div className={styles.right}>
        <Button variant="contained" size="large">
          Login In
        </Button>
      </div>
    </div>
  );
};
