export type SV = { s: number; v: number };
export type RGBA = { r: number; g: number; b: number; a: number };
export type HSLA = { h: number; s: number; l: number; a: number };
export type HSVA = { h: number; s: number; v: number; a: number };
export type Spectrum = {
  h: number;
  s: number;
  v?: number | undefined;
  l?: number | undefined;
  a: number;
};
export type HEX = string;
export type Color = RGBA | HSLA | HSVA | HEX | string;

export type Colors = {
  rgba?: RGBA;
  hsla?: HSLA;
  hsva?: HSVA;
  hex?: HEX;
  hex8?: HEX;
};

export type RGBAFormat = "rgba";
export type HSLAFormat = "hsla";
export type HSVAFormat = "hsva";
export type HEXFormat = "hex";
export type HEX8Format = "hex8";

export type ColorFormats =
  | RGBAFormat
  | HSLAFormat
  | HSVAFormat
  | HEXFormat
  | HEX8Format;

export type Bounds = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export type PanEvent = {
  panX: number;
  panY: number;
  width: number;
  height: number;
  dpi: number;
  elementId: string;
};

export type SetColor = {
  setColor(color: Color): void;
};
