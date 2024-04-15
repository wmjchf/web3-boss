import React, { useRef, useEffect, useState } from "react";
import { Item } from "./Item";
import NoData from "@/image/common/no-list.png";
import styles from "./index.less";
import { Waterfull } from "@/components/Waterfull";
import { useJobsStore } from "@/store";
import { getJobList } from "@/api/job";
import classNames from "classnames";

export const Result = () => {
  const divRef = useRef<HTMLDivElement>();
  const [height, setHeight] = useState(0);
  const { jobList } = useJobsStore();
  const [width, setWidth] = useState(1600);
  const [columns, setColumns] = useState(4);
  useEffect(() => {
    const width = document.documentElement.clientWidth;
    if (width < 1700) {
      setWidth(width - 100);
      if (width < 1550) {
        setColumns(3);
      }
    }
    if (width < 750) {
      setWidth(width - 20);

      setColumns(1);
    }
  }, []);

  return (
    <div
      className={classNames(
        styles.result,
        jobList.length === 0 && styles.block
      )}
      style={{
        [jobList.length !== 0 ? "height" : ""]: height,
      }}
      ref={divRef}
    >
      {/* {list.map((item) => {
        return <Item key={item.logo} data={item}></Item>;
      })} */}
      {jobList?.length == 0 ? (
        <div className={styles.no__data}>
          <img src={NoData}></img>
          <span>还没有工作机会，非常抱歉</span>
        </div>
      ) : (
        <Waterfull
          columns={columns}
          data={jobList}
          width={width}
          onHeight={(height) => {
            setHeight(height);
          }}
          itemGap={15}
          renderItem={(data) => {
            return <Item data={data}></Item>;
          }}
        ></Waterfull>
      )}
    </div>
  );
};
