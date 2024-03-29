import React from "react";
export type componentsType = "media" | "base" | "visible" | "shop";

interface IDynamicEngine {
  isTpl: boolean;
  config: { [key: string]: unknown };
  type: string;

  category: string;
}
export const DynamicEngine: React.FC<IDynamicEngine> = (prop) => {
  const { type, category } = prop;
  const Component = React.lazy(
    async () => await import(`@/materials/${category}/${type}`)
  );

  return (
    <React.Suspense fallback={<></>}>
      <Component {...prop.config}></Component>
    </React.Suspense>
    // <></>
  );
};
