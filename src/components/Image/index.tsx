import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Skeleton from "@mui/material/Skeleton";
import { OSS_ORIGIN } from "@/constant/index";
import styles from "./index.less";
import { getPreviewNormalUrl } from "@/api/common";

interface IImage {
  className?: string;
  style?: React.CSSProperties;
  src?: string;
}
export const Image: React.FC<IImage> = (props) => {
  const { className, style, src } = props;
  const [load, setLoad] = useState(true);
  const [url, setUrl] = useState("");

  return (
    <div className={classNames(className, styles.image)} style={style}>
      {load ? (
        <Skeleton
          variant="rounded"
          width={"100%"}
          height={"100%"}
          className={styles.skeleton}
        ></Skeleton>
      ) : (
        <></>
      )}
      <img
        src={src}
        alt=""
        onLoad={() => {
          setLoad(false);
        }}
      ></img>
    </div>
  );
};
