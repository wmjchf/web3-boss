import React from "react";
import { InfiniteScroll, PullToRefresh } from "antd-mobile";
import { Search } from "./components/Search";
import { Result } from "./components/Result";
import styles from "./index.less";
import { useSearchParams } from "react-router-dom";
import { useJobsStore } from "@/store";

export const Jobs = () => {
  const [searchParams] = useSearchParams();
  const address = searchParams.get("address");
  const { getJobList, hasMore, refresh, refreshing } = useJobsStore();
  address && localStorage.setItem("address", address);
  return (
    <div className={styles.jobs}>
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
        {!refreshing && (
          <InfiniteScroll
            hasMore={hasMore}
            loadMore={getJobList}
            className={styles.footer}
          ></InfiniteScroll>
        )}
      </PullToRefresh>
    </div>
  );
};
