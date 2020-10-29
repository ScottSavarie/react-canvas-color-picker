export type SV = { s: number; v: number };
export type RGBA = { r: number; g: number; b: number; a: number };
export type HSLA = { h: number; s: number; l: number; a: number };
export type HSVA = { h: number; s: number; v: number; a: number };
export type SPECTRUM = {
  h: number;
  s: number;
  v?: number | undefined;
  l?: number | undefined;
  a: number;
};
export type HEX = string;
export type COLOR = RGBA | HSLA | HSVA | HEX | string;

export type COLORS = {
  rgba?: RGBA;
  hsla?: HSLA;
  hsva?: HSVA;
  hex?: HEX;
  hex8?: HEX;
};

export type RGBA_FORMAT = "rgba";
export type HSLA_FORMAT = "hsla";
export type HSVA_FORMAT = "hsva";
export type HEX_FORMAT = "hex";
export type HEX8_FORMAT = "hex8";

export type COLOR_FORMATS =
  | RGBA_FORMAT
  | HSLA_FORMAT
  | HSVA_FORMAT
  | HEX_FORMAT
  | HEX8_FORMAT;

export type BOUNDS = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export type PAN_EVENT = {
  panX: number;
  panY: number;
  width: number;
  height: number;
  dpi: number;
  elementId: string;
};
