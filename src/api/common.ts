import { post, get, put } from "@/request";

export const getPreviewUrl = (data: unknown) => get("/common/preview", data);

export const getPreviewNormalUrl = (data: unknown) =>
  get("/common/preview/normal", data);
