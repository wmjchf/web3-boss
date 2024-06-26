import { post, get, put } from "@/request";
export interface ICompany {
  name: string;
  logo: string;
  location: string;
  description: string;
  userId: number;
  id: number;
}
export interface IPicture {
  url: string;
  companyId: string;
  id: number;
}

export const addCompany = (data: unknown) => post<ICompany>("company", data);

export const getCompanyListByAddress = (address: string) =>
  get<{
    pageNum: number;
    pageSize: number;
    total: number;
    list: ICompany[];
  }>("company", { address });

export const getCompanyDetail = (id: number) => get<ICompany>(`company/${id}`);

export const updateCompany = (id: number, data: unknown) =>
  put<boolean>(`company/${id}`, data);

export const addPicture = (companyId: number, data: unknown) =>
  post<IPicture[]>(`cpicture/${companyId}`, data);

export const getPicture = (companyId: number) =>
  get<{
    pageNum: number;
    pageSize: number;
    total: number;
    list: IPicture[];
  }>("cpicture", { companyId });
