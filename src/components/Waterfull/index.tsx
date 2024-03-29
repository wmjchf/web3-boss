import React, { useRef, useMemo } from "react";

import styles from "./index.less";
interface IData {}
interface IWaterfull<T> {
  width: number;
  columns: number;
  data: T[];
  itemGap?: number;
}
export function findMinColumnIndex(columns: Array<number>): number {
  let minIndex = 0;
  let minNumber = columns[0];
  columns.forEach((value, index) => {
    if (value < minNumber) {
      minNumber = value;
      minIndex = index;
    }
  });
  return minIndex;
}
export function findMaxColumnValue(columns: Array<number>): number {
  let maxNumber = columns[0];
  columns.forEach((value) => {
    if (value > maxNumber) {
      maxNumber = value;
    }
  });
  return maxNumber;
}

export const Waterfull = <T extends IData>(
  props: IWaterfull<T>
): React.ReactElement => {
  const { columns, width, itemGap } = props;

  const heightArrRef = useRef<Array<number>>(new Array(columns).fill(0));

  const itemWidth = useMemo(() => {
    return (width - (columns - 1) * itemGap) / columns;
  }, [width, columns, itemGap]);
  return <div className={styles.waterfull}></div>;
};
