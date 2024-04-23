import React, { useRef, useEffect } from "react";
import { InfiniteScroll, PullToRefresh } from "antd-mobile";
import { Search } from "./components/Search";
import { Result } from "./components/Result";
import styles from "./index.less";
import KeepAlive from "react-activation";
import { useSearchParams } from "react-router-dom";
import { useJobsStore } from "@/store";
import classNames from "classnames";
import Fab from "@mui/material/Fab";
import { getTicket } from "@/api/wx";
import toast from "react-hot-toast";

const Jobs = () => {
  const divRef = useRef<HTMLDivElement>();
  const [searchParams] = useSearchParams();
  const address = searchParams.get("address");
  address && localStorage.setItem("address", address);
  const { getJobList, hasMore, refresh, refreshing, first, jobList } =
    useJobsStore();

  // useEffect(() => {
  //   const url = window.location.href;

  //   getTicket({ url }).then(({ result }) => {
  //     wx.config({
  //       ...result,
  //       jsApiList: ["updateTimelineShareData"],
  //     });
  //   });
  // }, []);
  return (
    <div className={styles.jobs} ref={divRef}>
      <PullToRefresh
        onRefresh={() => {
          // store.Message.resetCOData();
          // store.Message.setCORefresh(true);
          refresh();
          return getJobList();
        }}
      >
        <Search></Search>
        <Result></Result>

        {!refreshing && (first || jobList.length > 0) ? (
          <InfiniteScroll
            hasMore={hasMore}
            loadMore={getJobList}
            className={classNames(styles.footer)}
          ></InfiniteScroll>
        ) : (
          <></>
        )}
        <div className={styles.footer}>
          <a href="https://beian.miit.gov.cn" target="_blank">
            鄂ICP备2024049946号
          </a>
        </div>
      </PullToRefresh>

      <Fab
        color="primary"
        aria-label="add"
        className={styles.add}
        onClick={() => {
          divRef.current?.scrollTo({
            top: 0,
          });
        }}
      >
        <i className="iconfont icon-huidaodingbu"></i>
      </Fab>
      <Fab
        color="primary"
        aria-label="add"
        className={styles.publish}
        onClick={() => {
          toast("需要在pc浏览器打开", {
            icon: "😬",
            duration: 5000,
          });
          return;
        }}
      >
        <i className="iconfont icon-tianjia1"></i>
      </Fab>
    </div>
  );
};

export default Jobs;
