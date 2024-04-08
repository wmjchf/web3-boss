import React from "react";

import styles from "./index.less";
import { IApply } from "@/api/apply";
import { timeAgo } from "@/utils/time";
import { EllipsisMiddle } from "../EllipsisMiddle";
import classNames from "classnames";

interface IApplyItem {
  data: IApply;
  onClick?: () => void;
  showTime?: boolean;
  style?: React.CSSProperties;
  className?: string;
  showDelete?: boolean;
  onDelete?: () => void;
  isChoice?: boolean;
  checked?: boolean;
  onSelect?: () => void;
}
export const ApplyItem: React.FC<IApplyItem> = (props) => {
  const {
    data,
    onClick,
    onDelete,
    showTime = true,
    style,
    className,
    showDelete = false,
    isChoice = false,
    checked = false,
    onSelect,
  } = props;

  return (
    <div
      className={classNames(styles.apply__item, className)}
      onClick={onClick}
      style={style}
    >
      <div className={styles.left}>
        <div className={styles.icon}>
          <i className="iconfont icon-resume-line"></i>
        </div>
      </div>
      <div className={styles.right__container}>
        <div className={styles.right}>
          <div
            className={classNames(styles.name, !showTime && styles.no__margin)}
          >
            {data.resume?.name && (
              <EllipsisMiddle
                value={data.resume?.name}
                suffixCount={7}
              ></EllipsisMiddle>
            )}

            {/* {data.resume.name} */}
          </div>
          {showTime && (
            <div className={styles.time}>
              {timeAgo(new Date(data?.updatedAt))}
            </div>
          )}
        </div>
        {showDelete && (
          <div
            className={styles.end}
            onClick={(event) => {
              event.stopPropagation();
              onDelete && onDelete();
            }}
          >
            <i className="iconfont icon-shanchu"></i>
          </div>
        )}
        {isChoice && (
          <div
            className={styles.end}
            onClick={(event) => {
              event.stopPropagation();
              onSelect && onSelect();
            }}
          >
            <div className={styles.outer}>
              {checked && <div className={styles.inner}></div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
