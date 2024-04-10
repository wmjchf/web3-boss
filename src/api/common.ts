import { post, get, put } from "@/request";

export const download = (data: unknown) => post("/common/download", data);
