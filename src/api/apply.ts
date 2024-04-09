import { post, get, put } from "@/request";
import { IResume } from "./resume";
export interface IApply {
  resumeUrl: string;
  id: number;
  uid: number;
  jobId: number;
  haveRead: boolean;
  mark: boolean;
  resume: IResume;
  resetIntegral?: number;
  job: any;
}

interface IAddApply {
  id: number;
  resetIntegral?: number;
}

export const addApply = (data: unknown) => post<IAddApply>(`apply`, data);

export const getApplyList = (data: unknown) =>
  get<{
    pageNum: number;
    pageSize: number;
    total: number;
    list: IApply[];
  }>("apply/list", data);

export const getApplySelf = (data: unknown) =>
  get<{
    pageNum: number;
    pageSize: number;
    total: number;
    list: IApply[];
  }>(`apply`, data);

export const updateApply = (id: number, data: unknown) =>
  put<boolean>(`apply/${id}`, data);
