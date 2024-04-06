import React, { useMemo } from "react";

import styles from "./index.less";
import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface IItem {
  data: any;
  apply: any;
  onClose?: () => void;
}
export const Item: React.FC<IItem> = (props) => {
  const { data, apply, onClose } = props;
  const navigate = useNavigate();
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
          <span>收藏</span>
        </div>
      );
    }
  }, [apply]);
  return (
    <div
      className={styles.item}
      onClick={() => {
        navigate(`job/${apply.jobId}`);
        onClose && onClose();
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
        <div className={styles.address}>
          <span>地址：</span>
          <span>{data.location}</span>
        </div>
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
      <div className={styles.bottom}>{status}</div>
    </div>
  );
};
