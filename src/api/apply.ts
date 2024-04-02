import { post, get } from "@/request";
export interface IApply {
  resumeUrl: string;
  id: number;
  uid: number;
}

export const addApply = (data: unknown) => post<IApply>(`apply`, data);

export const getApplyList = () =>
  get<{
    pageNum: number;
    pageSize: number;
    total: number;
    list: IApply[];
  }>("apply/list");

export const getApply = () => get<IApply>("apply");
