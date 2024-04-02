import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { Drawer } from "@mui/material";
import { DrawList } from "./components/DrawList";
import styles from "./index.less";

const BasicLayout = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.basic__layout}>
      <Header
        onClick={() => {
          setOpen(true);
        }}
      />
      <div className={styles.content}>
        <Outlet></Outlet>
      </div>
      <Drawer
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DrawList></DrawList>
      </Drawer>
    </div>
  );
};

export default BasicLayout;
