import React, { useMemo } from "react";

import styles from "./index.less";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

interface IItem {
  data: any;
  apply: any;
  onClose?: (jobId: number) => void;
}
export const Item: React.FC<IItem> = (props) => {
  const { data, apply, onClose } = props;

  const salary = useMemo(() => {
    return data?.isFace ? "面议" : `${data.minSalary}~${data.maxSalary}`;
  }, [data]);
  const status = useMemo(() => {
    if (!apply.haveRead) {
      return (
        <div className={styles.no__read}>
          <i></i>
          <span>未读</span>
        </div>
      );
    }
    if (apply.isDownload) {
      return (
        <div className={styles.download}>
          <i className="iconfont icon-xiazai"></i>
          <span>已被下载</span>
        </div>
      );
    }
    if (!apply.mark && apply.haveRead) {
      return (
        <div className={styles.have__read}>
          <i className="iconfont icon-yidu"></i>
          <span>已读</span>
        </div>
      );
    }
    if (apply.mark) {
      return (
        <div className={styles.mark}>
          <i className="iconfont icon-yishoucang"></i>
          <span>已被标记</span>
        </div>
      );
    }
  }, [apply]);
  return (
    <div
      className={classNames(styles.item, data.isDelete ? styles.disabled : "")}
      onClick={() => {
        if (data.isDelete) {
          return;
        }

        onClose && onClose(apply.jobId);
      }}
    >
      <div className={styles.top}>
        <div className={styles.company__name}>
          <span>{data.company?.name}</span>
        </div>
        <div className={styles.position}>
          <span>{data.name}</span>
          <span>{salary}</span>
        </div>
        {!data?.isRemote && (
          <div className={styles.address}>
            <span>地址：</span>
            <span>{data.location}</span>
          </div>
        )}
        <div className={styles.tag}>
          {data?.tag?.split(",").map((item) => {
            return (
              <Chip
                key={item}
                label={item}
                className={styles.chip}
                size="small"
              />
            );
          })}

          <Chip
            key={data?.isRemote ? "支持远程" : "不支持远程"}
            label={data?.isRemote ? "支持远程" : "不支持远程"}
            className={styles.chip}
            size="small"
          />
        </div>
      </div>
      <div className={styles.bottom}>
        <span className={styles.delete}>
          {data.isDelete ? "岗位已被删除" : ""}
        </span>

        {data.isDelete ? "" : status}
      </div>
    </div>
  );
};
