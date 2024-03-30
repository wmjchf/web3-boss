import React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Introduce } from "./components/Introduce";
import { Picture } from "./components/Picture";
import styles from "./index.less";

export const Company = () => {
  return (
    <div className={styles.company}>
      <Introduce></Introduce>
      <Picture></Picture>
      <Fab color="primary" aria-label="add" className={styles.add}>
        {/* <AddIcon /> */}
      </Fab>
    </div>
  );
};
