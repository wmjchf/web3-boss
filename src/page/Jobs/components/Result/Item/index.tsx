import React from "react";

import styles from "./index.less";

interface IItem {
  data: any;
}
export const Item: React.FC<IItem> = (props) => {
  const { data } = props;
  return (
    <div className={styles.item}>
      <div className={styles.logo}>
        <img src={data.logo} alt="" />
      </div>
      <div className={styles.company__name}>
        <span>{data.companyName}</span>
      </div>
      <div className={styles.position}>
        <span>{data.position}</span>
      </div>
      <div className={styles.address}>
        <span>地址：</span>
        <span>{data.address}</span>
      </div>
      <div className={styles.required}>
        <span>职位描述</span>
        <span>{data.description}</span>
        {/* <div className={styles.required1}>
          <span></span>
          <span>
            精通JavaScript语言核心技术开发DOM、Ajax、JSON等相关技术，对JavaScript面向对象编程有自己的理解；
          </span>
        </div>
        <div className={styles.required1}>
          <span></span>
          <span>熟悉ES6规范，可以使用基本的ES6语法；</span>
        </div>
        <div className={styles.required1}>
          <span></span>
          <span>
            熟悉应用JQuery,同时熟悉Vue、React、angular等前端主流框架之一；
          </span>
        </div> */}
      </div>
      <div className={styles.time}>
        <span>{data.time}</span>
      </div>
    </div>
  );
};
