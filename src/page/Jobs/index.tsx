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

const Jobs = () => {
  const divRef = useRef<HTMLDivElement>();
  const [searchParams] = useSearchParams();
  const address = searchParams.get("address");
  address && localStorage.setItem("address", address);
  const { getJobList, hasMore, refresh, refreshing, first, jobList } =
    useJobsStore();

  useEffect(() => {
    const url = window.location.href;

    getTicket({ url }).then(({ result }) => {
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        ...result,
        jsApiList: ["updateTimelineShareData"], // 必填，需要使用的JS接口列表
      });
    });
  }, []);
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
        {!refreshing && (first || jobList.length > 0) && (
          <InfiniteScroll
            hasMore={hasMore}
            loadMore={getJobList}
            className={classNames(styles.footer)}
          ></InfiniteScroll>
        )}
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
    </div>
  );
};

export default Jobs;
