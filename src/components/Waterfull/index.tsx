import React, { useRef, useMemo, useState } from "react";

import styles from "./index.less";
import { IWaterItemPosition, Item } from "./Item";
interface IData {
  actualHeight?: number;
  id: number;
}
interface IWaterfull<T> {
  width: number;
  columns: number;
  data: T[];
  itemGap?: number;
  renderItem?: (node: T, itemWidth: number) => React.ReactNode;
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
  const { columns, width, itemGap, data, renderItem } = props;

  const heightArrRef = useRef<Array<number>>(new Array(columns).fill(0));
  const [maxHeight, setMaxHeight] = useState(0);
  const itemWidth = useMemo(() => {
    return (width - (columns - 1) * itemGap) / columns;
  }, [width, columns, itemGap]);
  const getWaterfallItemPostionInfo = (node: T): IWaterItemPosition => {
    const { actualHeight = 0 } = node;

    const itemHeight = actualHeight + itemGap;

    const minHeightIndex = findMinColumnIndex(heightArrRef.current);

    const prevMinHeight = heightArrRef.current[minHeightIndex];

    heightArrRef.current[minHeightIndex] += itemHeight;
    const maxHeight = findMaxColumnValue(heightArrRef.current);
    setMaxHeight(maxHeight);
    return {
      index: minHeightIndex,
      top: prevMinHeight,
    };
  };
  return (
    <div className={styles.waterfull}>
      {data.map((item) => {
        return (
          <Item
            width={itemWidth}
            key={item.id}
            node={item}
            itemGap={itemGap}
            getWaterfallItemPostionInfo={getWaterfallItemPostionInfo}
          >
            {renderItem && renderItem(item, itemWidth)}
          </Item>
        );
      })}
    </div>
  );
};
