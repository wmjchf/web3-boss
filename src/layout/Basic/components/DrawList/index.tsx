import React, { useRef } from "react";

import styles from "./index.less";
import Button from "@mui/material/Button";
import ScorePng from "@/image/my/score.svg";
import { useDisconnect } from "wagmi";
import { ResumeModal } from "@/components/ResumeModal";
import { userUserStore } from "@/store";
import PdfPreview from "@/components/PdfPreview";
import { ApplyModal } from "@/components/ApplyModal";
import { SHARE_TIP } from "@/constant";

export const DrawList = (props) => {
  const { onClose } = props;
  const { disconnect } = useDisconnect();
  const { userInfo } = userUserStore();
  const resumeModalRef = useRef(0);
  const applyModalRef = useRef(0);
  const pdfPreviewRef = useRef<any>();
  return (
    <div className={styles.draw__list}>
      <div className={styles.top}>
        <div className={styles.score}>
          <div className={styles.main}>
            <span className={styles.lable}>豆豆余额：</span>
            <span className={styles.count}>{userInfo.integral}</span>
            <img src={ScorePng} alt="" />
            <Button
              className={styles.copy}
              onClick={() => {
                navigator.clipboard
                  .writeText(
                    `https://www.flowin3.com/jobs?address=${userInfo.address}`
                  )
                  .then(() => {
                    console.log("复制成功");
                  })
                  .catch(() => {
                    console.log("复制失败");
                  });
              }}
            >
              复制
            </Button>
          </div>
          <div className={styles.rule}>{SHARE_TIP}</div>
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
        <div
          className={styles.item}
          onClick={() => {
            applyModalRef.current?.handleOpen();
          }}
        >
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
      <ResumeModal
        ref={resumeModalRef}
        openResume={(item) => {
          pdfPreviewRef.current?.handleOpen(item.resumeUrl, item.id);
        }}
      ></ResumeModal>
      <ApplyModal
        ref={applyModalRef}
        onClose={() => {
          onClose && onClose();
        }}
      ></ApplyModal>
      <PdfPreview ref={pdfPreviewRef} showMark={false}></PdfPreview>
    </div>
  );
};
