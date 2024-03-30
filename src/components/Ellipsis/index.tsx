import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import Tooltip from "@mui/material/Tooltip";
import styles from "./index.less";

export type IEllipsisProps = {
  content: string;
  contentClass?: string;
  className?: string;
  style?: React.CSSProperties;
};

export const Ellipsis: React.FC<IEllipsisProps> = (props) => {
  const { className, content, contentClass, style } = props;
  const labelRef = useRef<HTMLLabelElement>(null);
  const [marginBottom, setMarginBottom] = useState(0);
  useEffect(() => {
    setMarginBottom(labelRef?.current?.offsetHeight as number);
  }, []);
  return (
    <div className={classNames(styles.ellipsis, className)} style={style}>
      <input
        type="checkbox"
        id="exp"
        className={styles["ellipsis--input"]}
      ></input>
      <div className={classNames(styles["ellipsis--text"], contentClass)}>
        <div
          className={styles["ellipsis--slide"]}
          style={{ marginBottom: -marginBottom }}
        ></div>
        <Tooltip title={content}>
          <label
            className={styles["ellipsis--button"]}
            // htmlFor="exp"
            ref={labelRef}
          ></label>
        </Tooltip>

        {content}
      </div>
    </div>
  );
};
