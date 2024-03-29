import React from "react";
import Drag from "@/components/Drag";
import { DynamicEngine } from "@/core/DynamicEngine";
import styles from "./index.less";

interface IViewRender {
  pointData: Array<PointData>;
  //   pageData?: any;
  width?: number;
}

export const ViewRender: React.FC<IViewRender> = (prop) => {
  const { pointData } = prop;

  const hAutoStyle = {
    height: "auto",
  };

  return (
    <div className={styles.view__render} id="view__render">
      {pointData?.map((item) => {
        return (
          <Drag
            key={item.id}
            points={["w", "e"]}
            container={"#view__render"}
            pos={[item.point.x, item.point.y]}
            size={[item.point.w, item.point.h]}
            style={{
              ...(item.point.hAuto ? hAutoStyle : {}),
            }}
          >
            <DynamicEngine {...item.item}></DynamicEngine>
          </Drag>
          // <></>
        );
      })}
    </div>
  );
};
