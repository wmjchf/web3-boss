import React from "react";

import styles from "./index.less";
import { Button } from "@mui/material";
import ScorePng from "@/image/my/score.svg";
import { useDisconnect } from "wagmi";
import { userUserStore } from "@/store";

export const DrawList = () => {
  const { disconnect } = useDisconnect();
  const { userInfo } = userUserStore();
  return (
    <div className={styles.draw__list}>
      <div className={styles.top}>
        <div className={styles.score}>
          <div className={styles.main}>
            <span className={styles.lable}>豆豆余额：</span>
            <span className={styles.count}>{userInfo.integral}</span>
            <img src={ScorePng} alt="" />
            <Button className={styles.copy}>复制</Button>
          </div>
          <div className={styles.rule}>
            点击复制按钮，分享给好友，即可获得20颗豆豆
          </div>
        </div>
      </div>
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
