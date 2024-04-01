import classNames from "classnames";
import React from "react";
import Popover from "@mui/material/Popover";
interface IEllipsisMiddle {
  value: string;
  suffixCount: number;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
  children?: React.ReactNode;
}
export const EllipsisMiddle: React.FC<IEllipsisMiddle> = (props) => {
  const { value, suffixCount, className, children } = props;
  const start = value.slice(0, suffixCount).trim();
  const suffix = value.slice(-suffixCount).trim();
  const [anchorEl, setAnchorEl] = React.useState<HTMLSpanElement | null>(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  return (
    <>
      <span className={classNames(className)} onClick={handleClick}>
        {start}....{suffix}
      </span>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {children}
      </Popover>
    </>
    // </Tooltip>
  );
};
