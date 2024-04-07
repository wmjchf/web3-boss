import React, { useRef } from "react";
import { InfiniteScroll, PullToRefresh } from "antd-mobile";
import { Search } from "./components/Search";
import { Result } from "./components/Result";
import styles from "./index.less";
import KeepAlive from "react-activation";
import { useSearchParams } from "react-router-dom";
import { useJobsStore } from "@/store";
import classNames from "classnames";
import { Fab } from "@mui/material";

export const Jobs = () => {
  const [searchParams] = useSearchParams();
  const divRef = useRef<HTMLDivElement>();
  const address = searchParams.get("address");
  const { getJobList, hasMore, refresh, refreshing, first, jobList } =
    useJobsStore();
  address && localStorage.setItem("address", address);
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
