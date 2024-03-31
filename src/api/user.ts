import { post, get } from "@/request";

// export const setProfile = (data: unknown) => post("/api/profile", data);

export const getNonce = () => get<{ nonce: string }>("user/nonce");

export const login = (data: unknown) =>
  post<{ token: string }>("user/login", data);
