import * as React from "react";
import { HSVA_FORMAT, HSLA_FORMAT } from "../../types";
declare type ColorBoxProps = {
    spectrumFormat: HSVA_FORMAT | HSLA_FORMAT;
    hue: number;
    saturation: number;
    value?: number;
    lightness?: number;
    width: number;
    height: number;
    className?: string;
    handleClasses?: string;
};
declare function Spectrum(props: ColorBoxProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof Spectrum>;
export default _default;
