import { post, get, put } from "@/request";
export interface IJob {
  name: string;
  isRemote: boolean;
  minSalary: string;
  maxSalary: string;
  tag: string;
  description: number;
  companyId: number;
  id: number;
  isFace: boolean;
  location: string;
}

export const addJob = (data: unknown) => post<IJob>("job", data);

export const getJobListByCompanyId = (companyId: number) =>
  get<{
    pageNum: number;
    pageSize: number;
    total: number;
    list: IJob[];
  }>("job", { companyId });

export const getJobDetail = (id: number) => get<IJob>(`job/${id}`);

export const updateJob = (id: number, data: unknown) =>
  put<boolean>(`job/${id}`, data);
