import * as React from "react";

import Handle from "../Handle/Handle";

import { formatColorBySpectrum } from "../../utils";

import { COLOR_PICKER_CLASSNAME } from "../../constants";
import { HSLA } from "../../types";

const styles = require("./Alpha.module.css");
const baseStyles = require("../ColorPicker/ColorPicker.module.css");

type AlphaProps = {
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

function Alpha(props: AlphaProps) {
  const {
    hue,
    alpha,
    saturation,
    lightness,
    value,
    spectrum,
    width: w,
    height: h,
    handleClasses,
    className,
  } = props;
  const dpi = window.devicePixelRatio || 1;
  const width = w * dpi;
  const height = h * dpi;
  const x = width * alpha;

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const gradientColor: HSLA =
    spectrum === "hsla"
      ? {
          h: hue,
          s: saturation,
          l: lightness,
          a: 1,
        }
      : (formatColorBySpectrum(
          {
            h: hue,
            s: saturation,
            v: value,
            a: 1,
          },
          "hsla"
        ) as HSLA);

  React.useEffect(() => {
    const currentContext = canvasRef.current
      ? canvasRef.current.getContext("2d")
      : null;
    if (currentContext) {
      currentContext.clearRect(0, 0, width, height);
      let gradient = currentContext.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(
        0,
        `hsla(${gradientColor.h}, ${gradientColor.s * 100}%, ${
          gradientColor.l * 100
        }%, 0%)`
      );
      gradient.addColorStop(
        1,
        `hsla(${gradientColor.h}, ${gradientColor.s * 100}%, ${
          gradientColor.l * 100
        }%, 100%)`
      );
      currentContext.fillStyle = gradient;
      currentContext.fillRect(0, 0, width, height);
    }

    return () => {};
  }, [hue, x, dpi, height, width, gradientColor]);

  return (
    <div
      id="alpha"
      className={`${COLOR_PICKER_CLASSNAME} ${styles.container} ${baseStyles.color_picker} ${className}`}
    >
      <canvas
        style={{
          width: `${width / dpi}px`,
          height: `${height / dpi}px`,
        }}
        width={width}
        height={height}
        ref={canvasRef}
      />
      <Handle
        className={handleClasses}
        hue={gradientColor.h}
        alpha={alpha}
        saturation={gradientColor.s}
        lightness={gradientColor.l}
        spectrumFormat="hsla"
        x={x}
        y={height / 2}
      />
    </div>
  );
}

export default React.memo(Alpha);
