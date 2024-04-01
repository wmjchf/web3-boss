import React from "react";
import { Ellipsis } from "@/components/Ellipsis";
import styles from "./index.less";

interface IItem {
  data: any;
}
export const Item: React.FC<IItem> = (props) => {
  const { data } = props;
  return (
    <div className={styles.item}>
      <div className={styles.position}>
        <span>{data.position}</span>
        <span>{data.salary}</span>
      </div>
      <div className={styles.required}>
        <Ellipsis content={data.description}></Ellipsis>
      </div>
      <div className={styles.time}>
        <span>{data.time}</span>
      </div>
    </div>
  );
};
