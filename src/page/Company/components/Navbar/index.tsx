import React, { useState } from "react";

import { EditPannel } from "../EditPannel";
import styles from "./index.less";
import classNames from "classnames";
import { Waterfull } from "@/components/Waterfull";
import { Item } from "./Item";

export const Navbar = () => {
  const [index, setIndex] = useState(1000);
  const [height, setHeight] = useState(0);
  const list = [
    {
      logo: "https://bx-branding-gateway.cloud.seek.com.au/7964ed18-692c-40c5-a733-c4540ee12ae8.1/serpLogo",
      companyName: "杭州阿里巴巴集团",
      position: "产品经理",
      address: "杭州市西湖区南山路128号2楼",
      description:
        "1、精通JavaScript语言核心技术开发DOM、Ajax、JSON等相关技术，对JavaScript面向对象编程有自己的理解,\n2、熟悉ES6规范，可以使用基本的ES6语法,熟悉应用JQuery,\n2、同时熟悉Vue、React、angular等前端主流框架之一；",
      time: "2024-03-29",
      id: 0,
      salary: "20k~25k",
    },
    {
      logo: "https://bx-branding-gateway.cloud.seek.com.au/04728ee7-b4c6-4fef-a3d4-9286247eda43.1/serpLogo",
      companyName: "杭州网易",
      position: "产品经理",
      address: "杭州市余杭区南北山路340号3楼",
      description:
        "现在，我们正处在长达 100 年的伟大的去中心化进程的中点。在各种机构正在进行大量的去中心化工作时，将这些机构与进程粘起来的则是便宜且无处不在的通信技术。当事物广泛传播到互联网时，如果没有能力让它们保持连接，工作着的集体就会分崩离析，并且带来些许倒退。更准确的说，是长距离即时通信的技术手段促成了这个去中心化的时代。也就是说，当我们用跨越沙漠、穿越海底的电费无休无止地在地球上缠绕时，去中心化趋势就成为了必然。现在，我们正处在长达 100 年的伟大的去中心化进程的中点。在各种机构正在进行大量的去中心化工作时，将这些机构与进程粘起来的则是便宜且无处不在的通信技术。当事物广泛传播到互联网时，如果没有能力让它们保持连接，工作着的集体就会分崩离析，并且带来些许倒退。更准确的说，是长距离即时通信的技术手段促成了这个去中心化的时代。也就是说，当我们用跨越沙漠、穿越海底的电费无休无止地在地球上缠绕时，去中心化趋势就成为了必然。",
      time: "2024-03-29",
      salary: "15k~20k",
      id: 1,
    },
    {
      logo: "https://bx-branding-gateway.cloud.seek.com.au/04728ee7-b4c6-4fef-a3d4-9286247eda43.1/serpLogo",
      companyName: "杭州网易",
      position: "产品经理",
      address: "杭州市余杭区南北山路340号3楼",
      description:
        "1、制定前端技术规划，选择技术团队的技术路线；2、优化前端/客户端业务架构；3、对内对外提升前端技术影响力；",
      time: "2024-03-29",
      id: 2,
      salary: "15k~20k",
    },
    {
      logo: "https://bx-branding-gateway.cloud.seek.com.au/04728ee7-b4c6-4fef-a3d4-9286247eda43.1/serpLogo",
      companyName: "杭州网易",
      position: "产品经理",
      address: "杭州市余杭区南北山路340号3楼",
      description:
        "1、制定前端技术规划，选择技术团队的技术路线；\n2、优化前端/客户端业务架构；\n3、对内对外提升前端技术影响力；",
      time: "2024-03-29",
      id: 3,
      salary: "15k~20k",
    },
    {
      logo: "https://bx-branding-gateway.cloud.seek.com.au/04728ee7-b4c6-4fef-a3d4-9286247eda43.1/serpLogo",
      companyName: "杭州网易",
      position: "产品经理",
      address: "杭州市余杭区南北山路340号3楼",
      description:
        "1、制定前端技术规划，选择技术团队的技术路线；\n2、优化前端/客户端业务架构；\n3、对内对外提升前端技术影响力；",
      time: "2024-03-29",
      id: 4,
      salary: "15k~20k",
    },
    {
      logo: "https://bx-branding-gateway.cloud.seek.com.au/04728ee7-b4c6-4fef-a3d4-9286247eda43.1/serpLogo",
      companyName: "杭州网易",
      position: "产品经理",
      address: "杭州市余杭区南北山路340号3楼",
      description:
        "1、制定前端技术规划，选择技术团队的技术路线；\n2、优化前端/客户端业务架构；\n3、对内对外提升前端技术影响力；",
      time: "2024-03-29",
      id: 5,
      salary: "15k~20k",
    },
    {
      logo: "https://bx-branding-gateway.cloud.seek.com.au/04728ee7-b4c6-4fef-a3d4-9286247eda43.1/serpLogo",
      companyName: "杭州网易",
      position: "产品经理",
      address: "杭州市余杭区南北山路340号3楼",
      description:
        "1、制定前端技术规划，选择技术团队的技术路线；\n2、优化前端/客户端业务架构；\n3、对内对外提升前端技术影响力；",
      time: "2024-03-29",
      id: 6,
      salary: "15k~20k",
    },
    {
      logo: "https://bx-branding-gateway.cloud.seek.com.au/04728ee7-b4c6-4fef-a3d4-9286247eda43.1/serpLogo",
      companyName: "杭州网易",
      position: "产品经理",
      address: "杭州市余杭区南北山路340号3楼",
      description:
        "1、制定前端技术规划，选择技术团队的技术路线；\n2、优化前端/客户端业务架构；\n3、对内对外提升前端技术影响力；",
      time: "2024-03-29",
      id: 7,
      salary: "15k~20k",
    },
  ];
  return (
    <EditPannel className={styles.edit__navbar} showEdit={false}>
      <div className={styles.navbar}>
        <div
          className={classNames(styles.item, index === 0 ? styles.active : "")}
          onClick={() => {
            setIndex(0);
          }}
        >
          <span>职位</span>
        </div>
        {/* <div
          className={classNames(styles.item, index === 1 ? styles.active : "")}
          onClick={() => {
            setIndex(1);
          }}
        >
          <span>文章</span>
        </div> */}
        <div
          className={styles.indictor}
          style={{
            left: `${index * 100}px`,
          }}
        ></div>
      </div>
      <div
        className={styles.body}
        style={{
          height,
        }}
      >
        <Waterfull
          columns={4}
          data={list}
          width={1552}
          itemGap={15}
          renderItem={(data) => {
            return <Item data={data}></Item>;
          }}
          onHeight={(height) => {
            setHeight(height);
          }}
        ></Waterfull>
      </div>
    </EditPannel>
  );
};
