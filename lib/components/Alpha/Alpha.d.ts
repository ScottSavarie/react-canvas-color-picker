import * as React from "react";
declare type AlphaProps = {
    hue: number;
    saturation: number;
    lightness: number;
    spectrum: string;
    value: number;
    alpha: number;
    width: number;
    height: number;
    className?: string;
    handleClasses?: string;
};
declare function Alpha(props: AlphaProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof Alpha>;
export default _default;
