import React from "react";
import Fab from "@mui/material/Fab";
import { Navbar } from "./components/Navbar";
import { Introduce } from "./components/Introduce";
import { Picture } from "./components/Picture";
import styles from "./index.less";

export const Company = () => {
  return (
    <div className={styles.company}>
      <Introduce></Introduce>
      <Picture></Picture>
      <Navbar></Navbar>
      <Fab color="primary" aria-label="add" className={styles.add}>
        {/* <AddIcon /> */}
      </Fab>
    </div>
  );
};
