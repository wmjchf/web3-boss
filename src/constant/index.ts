export const isDev = process.env.NODE_ENV === "development";
export const OSS_ORIGIN = isDev
  ? "http://flowin3-dev.oss-cn-hangzhou.aliyuncs.com/"
  : "http://flowin3.oss-cn-hangzhou.aliyuncs.com/";
export const OSS_ORIGIN_DNS = isDev
  ? "https://static-dev.flowin3.com/"
  : "https://static.flowin3.com/";
export const SHARE_TIP =
  "点击复制按钮，分享给其他用户并成功注册，即可获得20颗豆豆";

export const BASE_URL = isDev
  ? "http://192.168.0.106:8000"
  : "https://www.flowin3.com";
