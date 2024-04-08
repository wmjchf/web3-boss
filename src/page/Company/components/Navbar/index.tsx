import React, { useState, useEffect } from "react";

import { EditPannel } from "../EditPannel";
import styles from "./index.less";
import classNames from "classnames";
import { Waterfull } from "@/components/Waterfull";
import NoData from "@/image/common/no-list.png";
import { Item } from "./Item";
import { useJobListStore } from "@/store";

interface INavbar {
  companyId: number;
  userId: number;
}
export const Navbar: React.FC<INavbar> = (props) => {
  const { companyId, userId } = props;
  const [index, setIndex] = useState(1000);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(1552);
  const [columns, setColumns] = useState(4);
  const { getJobList, jobList } = useJobListStore();
  useEffect(() => {
    const width = document.documentElement.clientWidth;
    if (width < 1700) {
      setWidth(width - 148);
      if (width < 1500) {
        setColumns(3);
      }
    }
  }, []);
  useEffect(() => {
    // if (companyId) {
    getJobList(companyId);
    // }
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
          height: jobList?.length > 0 ? height : "auto",
        }}
      >
        {jobList?.length > 0 ? (
          <Waterfull
            columns={columns}
            data={jobList}
            width={width}
            itemGap={15}
            renderItem={(data) => {
              return <Item data={data} userId={userId}></Item>;
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
