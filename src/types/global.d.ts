declare module "*.svg";
declare module "*.png";
declare module "*.less";
declare module "*.docx";
declare module "*.json";
declare module "*.jpg";

interface Point {
  h: number;
  i: string;
  isBounded: boolean;
  moved: boolean;
  static: boolean;
  w: number;
  x: number;
  y: number;
}

interface PointData {
  id: string;
  item: Record<string, unknown>;
  status: string;
  point: Point;
}

declare const wx: any;
