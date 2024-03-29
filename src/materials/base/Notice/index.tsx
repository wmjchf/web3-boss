import React, { memo } from "react";

import { INoticeConfig } from "./schema";

interface INotice extends INoticeConfig {}
const Notice: React.FC<INotice> = memo((prop) => {
  const { align, text, fontSize, color, lineHeight } = prop;
  return (
    <div style={{ color, textAlign: align, fontSize, lineHeight }}>{text}</div>
  );
});
export default Notice;
