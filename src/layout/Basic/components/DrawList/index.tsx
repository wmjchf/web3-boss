import React from "react";

import styles from "./index.less";
import { Button } from "@mui/material";
import { useDisconnect } from "wagmi";

export const DrawList = () => {
  const { disconnect } = useDisconnect();
  return (
    <div className={styles.draw__list}>
      <div className={styles.top}></div>
      <div className={styles.bottom}>
        <Button
          onClick={() => {
            localStorage.removeItem("token");
            disconnect(
              {},
              {
                onSuccess() {
                  location.reload();
                },
              }
            );
          }}
        >
          退出登录
        </Button>
      </div>
    </div>
  );
};
