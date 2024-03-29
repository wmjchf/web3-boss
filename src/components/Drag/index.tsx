/* eslint-disable no-case-declarations */
/*  react drag
/*  author : xuxiaoxi
/*  date   : 2021-1-3 20:10:41
/*  last   : 2021-1-3 20:10:41
*/

import React, {
  ReactNode,
  useState,
  useRef,
  useEffect,
  useCallback,
  memo,
} from "react";
import classnames from "classnames";
import "./index.less";

interface IProps {
  container: HTMLElement | string;
  isStatic?: boolean;
  isEdit?: boolean;
  pos?: [number, number];
  size?: [number, number];
  transform?: string;
  zIndex?: number;
  children?: ReactNode;
  onDragStart?: (params) => void;
  onDragStop?: (params) => void;
  onDrag?: (params) => void;
  onEdit?: () => void;
  isSize?: boolean;
  style?: React.CSSProperties;
  isScale?: boolean;
  refresh?: boolean;
  sizeIcon?: string;
  points: string[];
  limit?: number;
}

interface OriPos {
  left: number;
  top: number;
  cX: number;
  cY: number;
  [name: string]: any;
}

type PosMap =
  | "e"
  | "w"
  | "s"
  | "n"
  | "ne"
  | "nw"
  | "se"
  | "sw"
  | "move"
  | "rotate"
  | "edit"
  | undefined;

/**
 * 自由拖拽组件
 * @param {container} 画布元素或者画布id
 * @param {pos} 画布初始化坐标
 * @param {size} 元素宽高
 * @param {isStatic} 是否禁止拖拽
 * @param {zIndex} 层级
 * @param {onDragStart} 鼠标拖拽开始
 * @param {onDragStop} 鼠标拖拽结束
 */
const Drag: React.FC<IProps> = (props) => {
  const {
    container = document.body,
    pos = [0, 0],
    size = [],
    zIndex = 1,
    isStatic = false,
    children,
    onDragStart,
    onDragStop,
    transform: rotate,
    isEdit = false,
    isSize = true,
    onDrag,
    onEdit,
    style: styleContainer,
    isScale = false,
    refresh = false,
    sizeIcon = "a-wenbenkuang1",
    points,
    limit = 9,
  } = props;

  const [style, setStyle] = useState({
    left: pos[0],
    top: pos[1],
    width: size[0] || "auto",
    height: size[1] || "auto",
    zIndex,
    transform: rotate,
  });

  const dragBox = useRef<HTMLElement | null>(null);

  const [showBaseLine, setShowBaseLine] = useState(false);

  const [deg, setDeg] = useState("");

  const dragRef = useRef<HTMLDivElement>(null);
  // const points = ["e", "w", "s", "n", "ne", "nw", "se", "sw"];
  // const points = isScale ? ["se"] : isSize ? ["e", "w"] : ["e", "w", "s", "n"];
  // const points_top = ["edit"];
  const points_top = [];

  // const points_top = ["edit"];

  const moveCurrentElement = useRef<boolean>(false);

  // init origin positon
  const oriPos = useRef<OriPos>({
    top: 0, // element position
    left: 0,
    cX: 0, // mouse position
    cY: 0,
  });
  const isDown = useRef(false);
  const direction = useRef<PosMap>();

  // mousedown
  const onMouseDown = (dir: PosMap, e: React.MouseEvent<HTMLElement>) => {
    // stop the event bubbles
    e.stopPropagation();
    // set layer level
    // setStyle(prev => ({...prev, zIndex: 9999}))

    // save direction
    direction.current = dir;
    isDown.current = true;

    const cY = e.clientY;
    const cX = e.clientX;
    oriPos.current = {
      ...style,
      cX,
      cY,
      width: dragRef.current?.clientWidth,
      height: dragRef.current?.clientHeight,
    };
    direction.current !== "edit" && onDragStart && onDragStart(oriPos.current);
    direction.current !== "edit" && setShowBaseLine(true);
  };

  const onTouchStart = (dir: PosMap, e: React.TouchEvent<HTMLElement>) => {
    // stop the event bubbles
    e.stopPropagation();
    // set layer level
    // setStyle(prev => ({...prev, zIndex: 9999}))

    // save direction
    direction.current = dir;
    isDown.current = true;

    const cY = e.targetTouches[0].pageY;
    const cX = e.targetTouches[0].pageX;
    oriPos.current = {
      ...style,
      cX,
      cY,
      width: dragRef.current?.clientWidth,
      height: dragRef.current?.clientHeight,
    };
    direction.current !== "edit" && onDragStart && onDragStart(oriPos.current);
    direction.current !== "edit" && setShowBaseLine(true);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    // stop the event bubbles
    e.stopPropagation();
    e.preventDefault();

    // Determine if the mouse is holding down
    if (!isDown.current) return;

    const y = e.targetTouches[0].pageY;
    const x = e.targetTouches[0].pageX;
    const newStyle = transform(direction.current, oriPos.current, { x, y });

    onDrag &&
      onDrag({
        ...newStyle,
        width: dragRef.current?.clientWidth,
        height: dragRef.current?.clientHeight,
      });
    setStyle(newStyle as any);
  };

  // move mouse
  const onMouseMove = (e) => {
    // stop the event bubbles
    e.stopPropagation();
    e.preventDefault();

    if (!isDown.current) return;
    const newStyle = transform(direction.current, oriPos.current, {
      x: e.clientX,
      y: e.clientY,
    });

    onDrag &&
      onDrag({
        ...newStyle,
        width: dragRef.current?.clientWidth,
        height: dragRef.current?.clientHeight,
      });

    setStyle(newStyle as any);
  };

  // The mouse is lifted
  const onMouseUp = (e) => {
    isDown.current = false;
    if (direction.current === "edit") return;

    onDragStop &&
      onDragStop({
        ...style,
        width: dragRef.current?.clientWidth,
        height: dragRef.current?.clientHeight,
      });
    setShowBaseLine(false);
  };

  const getTanDeg = (tan: number) => {
    let result = Math.atan(tan) / (Math.PI / 180);
    result = Math.round(result);
    return result;
  };

  function transform(
    direction: PosMap,
    oriPos: OriPos,
    pos: { x: number; y: number }
  ) {
    const style = { ...oriPos };
    const offsetX = pos.x - oriPos.cX;
    const offsetY = pos.y - oriPos.cY;

    switch (direction) {
      // move
      case "move":
        // element position and offset
        const top = oriPos.top + offsetY;
        const left = oriPos.left + offsetX;
        const width = dragBox.current?.offsetWidth || 0;
        const height = dragBox.current?.offsetHeight || 0;
        // Limit the height of the artboard - the height of the element - that must be moved within this range
        style.top = Math.max(
          0,
          Math.min(top, height - dragRef.current?.clientHeight)
        );
        style.left = Math.max(
          0,
          Math.min(left, width - dragRef.current?.clientWidth)
        );
        break;
      // east
      case "e":
        // Drag to the right to add width
        style.width =
          style.width + offsetX < limit ? limit : style.width + offsetX;

        return style;
      // west
      case "w":
        // Increase the width, position synchronization left shift
        style.width =
          style.width - offsetX < limit ? limit : style.width - offsetX;

        style.left += offsetX;
        return style;
      // south
      case "s":
        style.height =
          style.height - offsetY < limit ? limit : style.height - offsetY;
        style.top += offsetY;
        break;
      // north
      case "n":
        style.height =
          style.height + offsetY < limit ? limit : style.height + offsetY;
        return style;
      // northeast
      case "ne":
        style.height -= offsetY;
        style.top += offsetY;
        style.width += offsetX;
        break;
      // northwest
      case "nw":
        style.height -= offsetY;
        style.top += offsetY;
        style.width -= offsetX;
        style.left += offsetX;
        break;
      // southeast
      case "se":
        if (isScale) {
          style.width += offsetX;
          style.height = style.width;
        } else {
          style.height += offsetY;
          style.width += offsetX;
        }
        style.width =
          style.left + style.width > document.documentElement.clientWidth
            ? document.documentElement.clientWidth - style.left
            : style.width < limit
            ? limit
            : style.width;
        style.height =
          style.top + style.height > document.documentElement.clientHeight
            ? document.documentElement.clientHeight - style.top
            : style.height < limit
            ? limit
            : style.height;
        break;
      // southwest
      case "sw":
        style.height += offsetY;
        style.width -= offsetX;
        style.left += offsetX;
        break;
      case "rotate":
        // The center point of the element, x, y, is calculated as the coordinate origin first
        const x = dragRef.current?.clientWidth / 2 + style.left;
        const y = dragRef.current?.clientHeight / 2 + style.top;
        // The current mouse coordinates
        const x1 = pos.x;
        const y1 = pos.y;
        // Using triangular functions, there are bugs to optimize
        style.transform = `rotate(${~~(
          Math.atan2(y1 - y, x1 - x) /
          (Math.PI / 180)
        )}deg)`;

        setDeg(~~(Math.atan2(y1 - y, x1 - x) / (Math.PI / 180)) + "度");
        break;
    }
    return style;
  }

  useEffect(() => {
    dragBox.current = (
      typeof container === "object"
        ? container
        : document.querySelector(container)
    ) as HTMLElement;
    if (
      ["relative", "absolute", "fixed"].indexOf(
        dragBox.current.style.position
      ) < 0
    ) {
      dragBox.current.style.position = "relative";
    }
  }, []);

  useEffect(() => {
    setStyle({
      ...style,
      zIndex,
    });
  }, [zIndex]);
  useEffect(() => {
    setStyle({
      ...style,
      left: pos[0],
      top: pos[1],
      width: size[0] || "auto",
      height: size[1] || "auto",
    });
  }, [refresh]);

  useEffect(() => {
    dragBox.current.addEventListener("mouseup", () => {
      isDown.current = false;
    });
    dragBox.current.addEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div
      className="drag-item-wrap"
      style={
        {
          // width: `${style.width}px`,
          // height: `${style.height}px`,
        }
      }
    >
      {isStatic ? (
        <div
          className={classnames("x-drag-item", {
            "x-drag-item-edit": isEdit,
          })}
          style={{
            ...(style || {}),
            ...(styleContainer || {}),
          }}
        >
          {children}
        </div>
      ) : (
        <div
          className="x-drag-item"
          style={{
            ...(style || {}),
            ...(styleContainer || {}),
          }}
          onMouseDown={(e) => onMouseDown("move", e)}
          onMouseUp={onMouseUp}
          // onMouseMove={onMouseMove}
          onTouchStart={(e) => onTouchStart("move", e)}
          onTouchMove={onTouchMove}
          onTouchEnd={onMouseUp}
          ref={dragRef}
        >
          {showBaseLine && (
            <div
              className={"x-drag-item-center"}
              style={{ height: `${style.height}px` }}
            ></div>
          )}
          <div className="x-drag-item-child">{children}</div>
          {!isStatic && (
            <div className="x-drag-item-operate-top">
              {points_top.map((item) => (
                <div
                  className={classnames(`point-${item}`, {
                    ["control-rotator"]: item === "rotate",
                    // "control-point": true,
                    //   item !== "rotate" && item !== "move" && item !== "edit",
                    "control-operate": true,
                  })}
                  key={item}
                  onMouseDown={(e: React.MouseEvent<HTMLElement>) => {
                    e.stopPropagation();
                    onMouseDown(item as PosMap, e);
                  }}
                  onTouchStart={(e: React.TouchEvent<HTMLElement>) => {
                    e.stopPropagation();
                    onTouchStart(item as PosMap, e);
                  }}
                  onClick={(e: React.MouseEvent<HTMLElement>) => {
                    e.stopPropagation();
                    item === "edit" && onEdit && onEdit();
                  }}
                >
                  <i
                    className={classnames(
                      "iconfont",
                      `icon-space_${item}`,
                      `icon-${item === "se" ? sizeIcon : ""}`
                    )}
                  ></i>
                </div>
              ))}
            </div>
          )}

          {!isStatic &&
            points.map((item) => (
              <div
                className={classnames("control-point", `point-${item}`)}
                key={item}
                onMouseDown={(e: React.MouseEvent<HTMLElement>) =>
                  onMouseDown(item as PosMap, e)
                }
                onTouchStart={(e: React.TouchEvent<HTMLElement>) =>
                  onTouchStart(item as PosMap, e)
                }
              ></div>
            ))}
          {/* <div className="x-drag-item-operate-top">
            {!isStatic &&
              points_top.map((item) => (
                <div
                  className={classnames(`point-${item}`, {
                    ["control-rotator"]: item === "rotate",
                    // "control-point": true,
                    //   item !== "rotate" && item !== "move" && item !== "edit",
                    "control-operate": !!item,
                  })}
                  key={item}
                  onMouseDown={(e: React.MouseEvent<HTMLElement>) => {
                    e.stopPropagation();
                    onMouseDown(item as PosMap, e);
                  }}
                  onTouchStart={(e: React.TouchEvent<HTMLElement>) => {
                    e.stopPropagation();
                    onTouchStart(item as PosMap, e);
                  }}
                  onClick={(e: React.MouseEvent<HTMLElement>) => {
                    e.stopPropagation();
                    item === "edit" && onEdit && onEdit();
                  }}
                >
                  <i
                    className={classnames(
                      "iconfont",
                      `icon-space_${item}`,
                      `icon-${item === "se" ? "a-wenbenkuang1" : ""}`
                    )}
                  ></i>
                </div>
              ))}
          </div> */}
        </div>
      )}
      {/* <div className="x-drag-item-information">
        <span>长：{parseInt(`${style?.width}`)}</span>
        <span>高：{parseInt(`${style?.height}`)}</span>
        <span>left：{parseInt(`${style?.left}`)}</span>
        <span>top：{parseInt(`${style?.top}`)}</span>
        <span>角：{deg}</span>
      </div> */}
    </div>
  );
};

export default Drag;
