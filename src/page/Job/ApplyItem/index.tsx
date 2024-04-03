import React from "react";

import styles from "./index.less";
import { IApply } from "@/api/apply";
import { timeAgo } from "@/utils/time";

interface IApplyItem {
  data: IApply;
  onClick?: () => void;
}
export const ApplyItem: React.FC<IApplyItem> = (props) => {
  const { data, onClick } = props;
  return (
    <div className={styles.apply__item} onClick={onClick}>
      <div className={styles.left}>
        <div className={styles.icon}></div>
      </div>
      <div className={styles.right}>
        <div className={styles.name}>{data.resume.name}</div>
        <div className={styles.time}>{timeAgo(new Date(data.updatedAt))}</div>
      </div>
    </div>
  );
};
