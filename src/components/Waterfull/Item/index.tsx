import React, { useEffect, useRef, useState } from "react";
import styles from "./index.less";
export interface IWaterItemPosition {
  top: number;
  index: number;
}
export interface IWaterItemData {}
type IWaterfullItemProps<T extends IWaterItemData> = {
  node: T;
  getWaterfallItemPostionInfo: (node: T) => IWaterItemPosition;
  width: number;
  itemGap?: number;
  children?: React.ReactNode;
};

const Item = <T extends IWaterItemData>(
  props: IWaterfullItemProps<T>
): React.ReactElement => {
  const {
    node,
    itemGap = 0,
    width,
    getWaterfallItemPostionInfo,
    children,
  } = props;

  const divRef = useRef<HTMLDivElement>(null);
  const [positionInfo, setPositionInfo] = useState<IWaterItemPosition>();

  useEffect(() => {
    const positionInfo = getWaterfallItemPostionInfo({
      ...node,
      actualHeight: divRef.current?.offsetHeight,
    });

    setPositionInfo(positionInfo);
  }, []);

  return (
    <div
      className={styles.item}
      ref={divRef}
      style={{
        position: "absolute",
        top: positionInfo?.top,
        left: (positionInfo?.index || 0) * (width + itemGap),
        width,
      }}
    >
      {children}
    </div>
  );
};

export { Item };
