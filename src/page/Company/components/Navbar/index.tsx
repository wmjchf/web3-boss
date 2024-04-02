import React, { useState, useEffect } from "react";

import { EditPannel } from "../EditPannel";
import styles from "./index.less";
import classNames from "classnames";
import { Waterfull } from "@/components/Waterfull";
import NoData from "@/image/common/no-list.png";
import { Item } from "./Item";
import { IJob, getJobListByCompanyId } from "@/api/job";

interface INavbar {
  companyId: number;
}
export const Navbar: React.FC<INavbar> = (props) => {
  const { companyId } = props;
  const [index, setIndex] = useState(1000);
  const [height, setHeight] = useState(0);
  const [list, setList] = useState<IJob>([]);
  const handleGetJobs = async () => {
    const { result } = await getJobListByCompanyId(companyId);
    setList(result.list);
  };
  useEffect(() => {
    if (companyId) {
      handleGetJobs();
    }
  }, [companyId]);
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
          height: list?.length > 0 ? height : "auto",
        }}
      >
        {list?.length > 0 ? (
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
        ) : (
          <div className={styles.no__data}>
            <img src={NoData}></img>
            <span>没有数据，点击悬浮按钮可以去发布！</span>
          </div>
        )}
      </div>
    </EditPannel>
  );
};
