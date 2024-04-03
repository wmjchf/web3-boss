import { IJob, deleteJob, getJobListByCompanyId } from "@/api/job";
import toast from "react-hot-toast";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Action = {
  openConfirm: (job: IJob) => void;
  closeConfirm: () => void;
  deleteJob: () => Promise<boolean>;
  getJobList: (companyId: number) => void;

  openApply: () => void;
  closeApply: () => void;
};

interface State {
  confirmOpen: boolean;
  deleteItem: IJob;
  jobList: IJob[];

  applyOpen: boolean;
}

export const useJobListStore = create<State & Action>()(
  immer((set, get) => ({
    confirmOpen: false,
    applyOpen: false,
    deleteItem: null,
    jobList: [],
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
        companyId: deleteItem.companyId,
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
      const { result } = await getJobListByCompanyId(companyId);

      set((state) => {
        state.jobList = result.list;
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
  }))
);
