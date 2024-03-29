import React from "react";
import { Item } from "./Item";

import styles from "./index.less";

export const Result = () => {
  const list = [
    {
      logo: "https://bx-branding-gateway.cloud.seek.com.au/7964ed18-692c-40c5-a733-c4540ee12ae8.1/serpLogo",
      companyName: "杭州阿里巴巴集团",
      position: "产品经理",
      address: "杭州市西湖区南山路128号2楼",
      description:
        "1、精通JavaScript语言核心技术开发DOM、Ajax、JSON等相关技术，对JavaScript面向对象编程有自己的理解,\n2、熟悉ES6规范，可以使用基本的ES6语法,熟悉应用JQuery,\n2、同时熟悉Vue、React、angular等前端主流框架之一；",
      time: "2024-03-29",
    },
    {
      logo: "https://bx-branding-gateway.cloud.seek.com.au/04728ee7-b4c6-4fef-a3d4-9286247eda43.1/serpLogo",
      companyName: "杭州网易",
      position: "产品经理",
      address: "杭州市余杭区南北山路340号3楼",
      description:
        "1、制定前端技术规划，选择技术团队的技术路线；\n2、优化前端/客户端业务架构；\n3、对内对外提升前端技术影响力；",
      time: "2024-03-29",
    },
  ];
  return (
    <div className={styles.result}>
      {list.map((item) => {
        return <Item key={item.logo} data={item}></Item>;
      })}
    </div>
  );
};
