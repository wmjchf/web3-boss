import { post, get } from "@/request";
import { IResume } from "./resume";
import { IApply } from "./apply";
import { ICompany } from "./company";

export interface IUser {
  address: string;
  chainId: number;
  integral: number;
  id: number;
  resumes: IResume[];
  applies: IApply[];
  companies: ICompany[];
}
// export const setProfile = (data: unknown) => post("/api/profile", data);

export const getNonce = () => get<{ nonce: string }>("user/nonce");

export const login = (data: unknown) =>
  post<{ token: string }>("user/login", data);

export const getCurrentUser = () => get<IUser>("/user");
