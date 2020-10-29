export declare type SV = {
    s: number;
    v: number;
};
export declare type RGBA = {
    r: number;
    g: number;
    b: number;
    a: number;
};
export declare type HSLA = {
    h: number;
    s: number;
    l: number;
    a: number;
};
export declare type HSVA = {
    h: number;
    s: number;
    v: number;
    a: number;
};
export declare type SPECTRUM = {
    h: number;
    s: number;
    v?: number | undefined;
    l?: number | undefined;
    a: number;
};
export declare type HEX = string;
export declare type COLOR = RGBA | HSLA | HSVA | HEX | string;
export declare type COLORS = {
    rgba?: RGBA;
    hsla?: HSLA;
    hsva?: HSVA;
    hex?: HEX;
    hex8?: HEX;
};
export declare type RGBA_FORMAT = "rgba";
export declare type HSLA_FORMAT = "hsla";
export declare type HSVA_FORMAT = "hsva";
export declare type HEX_FORMAT = "hex";
export declare type HEX8_FORMAT = "hex8";
export declare type COLOR_FORMATS = RGBA_FORMAT | HSLA_FORMAT | HSVA_FORMAT | HEX_FORMAT | HEX8_FORMAT;
export declare type BOUNDS = {
    top: number;
    left: number;
    width: number;
    height: number;
};
export declare type PAN_EVENT = {
    panX: number;
    panY: number;
    width: number;
    height: number;
    dpi: number;
    elementId: string;
};
