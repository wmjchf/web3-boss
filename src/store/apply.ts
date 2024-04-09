import { IApply, getApplySelf } from "@/api/apply";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Action = {
  setPageNum: (pageNum) => void;
  setPageSize: (pageSize) => void;
  getApplyList: () => Promise<any>;
  refresh: () => void;
};

interface State {
  pageSize: number;
  pageNum: number;
  hasMore: boolean;
  refreshing: boolean;
  first: boolean;
  applyList: IApply[];
}

export const useApplyStore = create<State & Action>()(
  immer((set, get) => ({
    first: true,
    pageNum: 1,
    pageSize: 10,
    applyList: [],
    hasMore: true,
    refreshing: false,
    setPageNum: (pageNum) =>
      set((state) => {
        state.pageNum = pageNum;
      }),
    setPageSize: (pageSize) =>
      set((state) => {
        state.pageSize = pageSize;
      }),

    refresh: () => {
      set((state) => {
        state.pageNum = 1;
        state.applyList = [];
        state.refreshing = true;
      });
    },
    getApplyList: async () => {
      const { pageNum, pageSize, applyList } = get();
      const data = { pageNum, pageSize };

      const result = await getApplySelf(data);

      set((state) => {
        state.first = false;
        state.applyList = applyList.concat(result.result.list);
        state.refreshing = false;
        if (result.result.list.length < 10) {
          state.hasMore = false;
        } else {
          state.hasMore = true;
          state.pageNum++;
        }
      });
    },
  }))
);
