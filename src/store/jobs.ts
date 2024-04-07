import { IJob, getJobList } from "@/api/job";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Action = {
  setName: (name) => void;
  setIsRemote: (isRemote) => void;
  setLocation: (location) => void;
  setPageNum: (pageNum) => void;
  setPageSize: (pageSize) => void;
  getJobList: () => Promise<any>;
  refresh: () => void;
};

interface State {
  name: string;
  isRemote: boolean | string;
  location: string;
  pageSize: number;
  pageNum: number;
  hasMore: boolean;
  refreshing: boolean;

  jobList: IJob[];
}

export const useJobsStore = create<State & Action>()(
  immer((set, get) => ({
    name: "",
    isRemote: "",
    location: "",
    pageNum: 1,
    pageSize: 10,
    jobList: [],
    hasMore: true,
    refreshing: false,

    setName: (name) =>
      set((state) => {
        state.name = name;
      }),
    setPageNum: (pageNum) =>
      set((state) => {
        state.pageNum = pageNum;
      }),
    setPageSize: (pageSize) =>
      set((state) => {
        state.pageSize = pageSize;
      }),
    setLocation: (location) =>
      set((state) => {
        state.location = location;
      }),
    setIsRemote: (isRemote) =>
      set((state) => {
        state.isRemote = isRemote;
      }),
    refresh: () => {
      set((state) => {
        state.pageNum = 1;
        state.jobList = [];
        state.refreshing = true;
      });
    },
    getJobList: async () => {
      const { name, isRemote, location, pageNum, pageSize, jobList } = get();
      const data = { pageNum, pageSize };
      name && Object.assign(data, { name });
      isRemote && Object.assign(data, { isRemote });
      location && Object.assign(data, { location });
      const result = await getJobList(data);

      set((state) => {
        state.jobList = jobList.concat(result.result.list);
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
