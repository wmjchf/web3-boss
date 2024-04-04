import React, { useState } from "react";
import classNames from "classnames";
import Skeleton from "@mui/material/Skeleton";
import styles from "./index.less";

interface IImage {
  className?: string;
  style?: React.CSSProperties;
  src?: string;
}
export const Image: React.FC<IImage> = (props) => {
  const { className, style, src } = props;
  const [load, setLoad] = useState(true);

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
        src={""}
        alt=""
        onLoad={() => {
          // setLoad(false);
        }}
      ></img>
    </div>
  );
};
