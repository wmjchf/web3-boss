import { post, get } from "@/request";
export interface IResume {
  url: string;
  uid: number;
  id: number;
  name: string;
  isDelete: boolean;
}

export const addResume = (data: unknown) => post<IResume[]>(`resume`, data);

export const getResume = () =>
  get<{
    pageNum: number;
    pageSize: number;
    total: number;
    list: IResume[];
  }>("resume");

export const deleteResume = (id: number) =>
  post<boolean>(`resume/delete/${id}`);
