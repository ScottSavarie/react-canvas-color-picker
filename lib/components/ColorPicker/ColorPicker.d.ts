import * as React from "react";
import { HSVA_FORMAT, HSLA_FORMAT, COLOR, COLOR_FORMATS, COLORS } from "../../types/index";
declare type colorPickerChangeEvent = {
    colors: COLORS;
    canvasId: string;
};
declare type ColorPickerProps = {
    initialColor?: COLOR;
    formats?: COLOR_FORMATS[];
    spectrum?: HSVA_FORMAT | HSLA_FORMAT;
    spectrumWidth?: number;
    spectrumHeight?: number;
    sliderWidth?: number;
    sliderHeight?: number;
    className?: string;
    spectrumClasses?: string;
    hueClasses?: string;
    alphaClasses?: string;
    handleClasses?: string;
    onPanStart?: (event: colorPickerChangeEvent) => void;
    onPan?: (event: colorPickerChangeEvent) => void;
    onPanEnd?: (event: colorPickerChangeEvent) => void;
};
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<ColorPickerProps & React.RefAttributes<unknown>>>;
export default _default;
