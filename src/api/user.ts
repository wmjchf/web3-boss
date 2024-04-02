import { post, get } from "@/request";

export interface IUser {
  address: string;
  chainId: number;
  integral: number;
  id: number;
}
// export const setProfile = (data: unknown) => post("/api/profile", data);

export const getNonce = () => get<{ nonce: string }>("user/nonce");

export const login = (data: unknown) =>
  post<{ token: string }>("user/login", data);

export const getCurrentUser = () => get<IUser>("/user");
