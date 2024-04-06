import classNames from "classnames";
import React from "react";
interface IEllipsisMiddle {
  value: string;
  suffixCount: number;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
  children?: React.ReactNode;
}
export const EllipsisMiddle: React.FC<IEllipsisMiddle> = (props) => {
  const { value, suffixCount, className, children, onClick } = props;
  const start = value.slice(0, suffixCount).trim();
  const suffix = value.slice(-suffixCount).trim();
  const [anchorEl, setAnchorEl] = React.useState<HTMLSpanElement | null>(null);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const renderText = () => {
    if (value.length > 2 * suffixCount) {
      return `${start}.....${suffix}`;
    }
    return value;
  };
  return (
    <>
      <span className={classNames(className)} onClick={onClick}>
        {renderText()}
      </span>
    </>
    // </Tooltip>
  );
};
