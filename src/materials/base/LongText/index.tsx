import React, { memo } from "react";

import { ILongTextConfig } from "./schema";

interface ILongText extends ILongTextConfig {}
const LongText: React.FC<ILongText> = memo((prop) => {
  const { align, text, fontSize, color, lineHeight } = prop;

  return (
    <div style={{ color, textAlign: align, fontSize, lineHeight }}>{text}</div>
  );
});
export default LongText;
