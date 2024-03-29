import React, { memo } from "react";

import { ITextConfig } from "./schema";

interface IText extends ITextConfig {}
const Text: React.FC<IText> = memo((prop) => {
  const { align, text, fontSize, color, lineHeight } = prop;

  return (
    <div style={{ color, textAlign: align, fontSize, lineHeight }}>{text}</div>
  );
});

export default Text;
