import { IJob, deleteJob, getJobListByCompanyId } from "@/api/job";
import toast from "react-hot-toast";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Action = {
  openConfirm: (job: IJob) => void;
  closeConfirm: () => void;
  deleteJob: () => Promise<boolean>;
  getJobList: (companyId: number) => Promise<any>;
  setPageNum: (pageNum) => void;
  setPageSize: (pageSize) => void;
  refresh: () => void;
  openApply: () => void;
  closeApply: () => void;

  openDownload: () => void;
  closeDownlaod: () => void;
};

interface State {
  confirmOpen: boolean;
  deleteItem: IJob;
  jobList: IJob[];
  pageSize: number;
  pageNum: number;
  hasMore: boolean;
  refreshing: boolean;
  first: boolean;

  applyOpen: boolean;
  downlaodOpen: boolean;
}

export const useJobListStore = create<State & Action>()(
  immer((set, get) => ({
    confirmOpen: false,
    applyOpen: false,
    downlaodOpen: false,
    deleteItem: null,
    jobList: [],
    first: true,
    pageNum: 1,
    pageSize: 10,
    hasMore: true,
    refreshing: false,
    refresh: () => {
      set((state) => {
        state.pageNum = 1;
        state.jobList = [];
        state.refreshing = true;
      });
    },
    setPageNum: (pageNum) =>
      set((state) => {
        state.pageNum = pageNum;
      }),
    setPageSize: (pageSize) =>
      set((state) => {
        state.pageSize = pageSize;
      }),
    openConfirm: (job) =>
      set((state) => {
        state.confirmOpen = true;
        state.deleteItem = job;
      }),
    closeConfirm: () =>
      set((state) => {
        state.confirmOpen = false;
      }),
    deleteJob: async () => {
      const { deleteItem, jobList } = get();

      const result = await deleteJob(deleteItem.id, {
        companyId: deleteItem?.company?.id,
      });
      toast.success(result.message);
      const newList = jobList.filter((item) => item.id !== deleteItem.id);
      set((state) => {
        state.confirmOpen = false;
        state.jobList = newList;
      });
      return true;
    },
    getJobList: async (companyId: number) => {
      if (!companyId) {
        set((state) => {
          state.jobList = [];
        });
        return;
      }
      const { pageNum, pageSize, jobList } = get();
      const result = await getJobListByCompanyId({
        companyId,
        pageNum,
        pageSize,
      });
      set((state) => {
        state.first = false;
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
    openApply: () =>
      set((state) => {
        state.applyOpen = true;
      }),
    closeApply: () =>
      set((state) => {
        state.applyOpen = false;
      }),
    openDownload: () =>
      set((state) => {
        state.downlaodOpen = true;
      }),
    closeDownlaod: () =>
      set((state) => {
        state.downlaodOpen = false;
      }),
  }))
);
