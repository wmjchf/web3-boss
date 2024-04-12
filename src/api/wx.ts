import { get } from "@/request";

export interface ITicket {}
// export const setProfile = (data: unknown) => post("/api/profile", data);

export const getTicket = (data: unknown) => get<ITicket>("wx/ticket", data);
