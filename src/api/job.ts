import { post, get, put } from "@/request";
import { ICompany } from "./company";
export interface IJob {
  name: string;
  isRemote: boolean;
  minSalary: string;
  maxSalary: string;
  tag: string;
  description: number;
  company: ICompany;
  id: number;
  isFace: boolean;
  location: string;
  address: string;
  resetIntegral: number;
}

export const addJob = (data: unknown) => post<IJob>("job", data);

export const getJobListByCompanyId = (data: unknown) =>
  get<{
    pageNum: number;
    pageSize: number;
    total: number;
    list: IJob[];
  }>("job", data);

export const getJobList = (data: unknown) =>
  get<{
    pageNum: number;
    pageSize: number;
    total: number;
    list: IJob[];
  }>("job", data);

export const getJobDetail = (id: number) => get<IJob>(`job/${id}`);

export const updateJob = (id: number, data: unknown) =>
  put<boolean>(`job/${id}`, data);

export const deleteJob = (id: number, data: unknown) =>
  post<boolean>(`job/delete/${id}`);
