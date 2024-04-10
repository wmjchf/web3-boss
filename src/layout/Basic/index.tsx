import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import Drawer from "@mui/material/Drawer";
import Popover from "@mui/material/Popover";
import { NoticeBar } from "antd-mobile";
import { DrawList } from "./components/DrawList";
import QRCODE from "./image/qrcode.jpg";
import styles from "./index.less";

const BasicLayout = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const show = Boolean(anchorEl);
  return (
    <div className={styles.basic__layout}>
      <div className={styles.notice}>
        <NoticeBar
          content={
            <span>
              <i className={styles.platform}>FlowIn3</i>
              目的是为web3资源提供流动性！目前平台正处于试运行阶段，如遇到任何问题或者有任何改进建议，都可以在我们
              <i className={styles.public} onMouseEnter={handleClick}>
                公众号
              </i>
              留言。
            </span>
          }
          className={styles.notice__bar}
          // color="alert"
        />
      </div>
      <Popover
        // id={id}
        open={show}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        className={styles.popover}
      >
        <div className={styles.qrcode}>
          <img src={QRCODE}></img>
        </div>
      </Popover>
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
        <DrawList
          onClose={() => {
            setOpen(false);
          }}
        ></DrawList>
      </Drawer>
    </div>
  );
};

export default BasicLayout;
