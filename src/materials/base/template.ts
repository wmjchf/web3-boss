import Text from "./Text/template";
import Notice from "./Notice/template";
import LongText from "./LongText/template";

const basicTemplate = [Text, Notice, LongText];
const BasicTemplate = basicTemplate.map((v) => {
  return { ...v, category: "base" };
});

export default BasicTemplate;
