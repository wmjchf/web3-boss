import React, { useRef } from "react";

import styles from "./index.less";
import { Button } from "@mui/material";
import ScorePng from "@/image/my/score.svg";
import { useDisconnect } from "wagmi";
import { ResumeModal } from "@/components/ResumeModal";
import { userUserStore } from "@/store";

export const DrawList = () => {
  const { disconnect } = useDisconnect();
  const { userInfo } = userUserStore();
  const resumeModalRef = useRef(0);
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
        <div
          className={styles.item}
          style={{
            marginTop: "12px",
          }}
          onClick={() => {
            resumeModalRef.current?.handleOpen();
          }}
        >
          <i className="iconfont icon-resume-line"></i>
          <span>我的简历</span>
        </div>
        <div className={styles.item}>
          <i className="iconfont icon-wodetoudi"></i>
          <span>我的投递</span>
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
      <ResumeModal ref={resumeModalRef}></ResumeModal>
    </div>
  );
};
