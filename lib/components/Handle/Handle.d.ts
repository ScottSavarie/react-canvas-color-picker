import * as React from "react";
import { HSLA_FORMAT, HSVA_FORMAT } from "../../types";
declare type HandleProps = {
    x: number;
    y: number;
    hue: number;
    spectrumFormat?: HSLA_FORMAT | HSVA_FORMAT;
    saturation?: number;
    lightness?: number;
    value?: number;
    alpha?: number;
    className?: string;
};
declare function Handle(props: HandleProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof Handle>;
export default _default;
