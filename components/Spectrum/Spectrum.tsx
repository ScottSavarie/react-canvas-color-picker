import * as React from "react";

import Handle from "../Handle/Handle";

import { mapRange } from "../../utils";
import { HSVA_FORMAT, HSLA_FORMAT } from "../../types";
import { COLOR_PICKER_CLASSNAME } from "../../constants";

const styles = require("./Spectrum.module.css");
const baseStyles = require("../ColorPicker/ColorPicker.module.css");

type ColorBoxProps = {
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

function Spectrum(props: ColorBoxProps) {
  const {
    spectrumFormat,
    hue,
    saturation,
    value = 1,
    lightness = 1,
    width: w,
    height: h,
    className,
    handleClasses,
  } = props;
  const dpi = window.devicePixelRatio || 1;
  const width = w * dpi;
  const height = h * dpi;
  const x = width * saturation;
  const yInput = spectrumFormat === "hsva" ? value : lightness;
  const y = height * mapRange(yInput, 0, 1, 1, 0);

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const currentContext = canvasRef.current
      ? canvasRef.current.getContext("2d")
      : null;
    if (currentContext) {
      if (spectrumFormat === "hsva") {
        currentContext.fillStyle = `hsl(${hue}, 100%, 50%)`;
        currentContext.fillRect(0, 0, width, height);

        let whiteGradient = currentContext.createLinearGradient(0, 0, width, 0);
        whiteGradient.addColorStop(0, "hsla(0,0%,100%, 100%)");
        whiteGradient.addColorStop(1, "hsla(0,0%,100%, 0%)");
        currentContext.fillStyle = whiteGradient;
        currentContext.fillRect(0, 0, width, height);

        let blackGradient = currentContext.createLinearGradient(
          0,
          height,
          0,
          0
        );
        blackGradient.addColorStop(0, "hsla(0,0%,0%, 100%)");
        blackGradient.addColorStop(1, "hsla(0,0%,0%, 0%");
        currentContext.fillStyle = blackGradient;
        currentContext.fillRect(0, 0, width, height);
      } else {
        for (let row = 0; row < height; row++) {
          const gradient = currentContext.createLinearGradient(0, 0, width, 0);
          gradient.addColorStop(
            0,
            `hsl(${hue}, 0%, ${(1 - row / height) * 100}%)`
          );
          gradient.addColorStop(
            1,
            `hsl(${hue}, 100%, ${(1 - row / height) * 100}%)`
          );
          currentContext.fillStyle = gradient;
          currentContext.fillRect(0, row, width, 1);
        }
      }
    }
  }, [hue, width, height, spectrumFormat]);

  return (
    <div
      id={
        spectrumFormat === "hsva" ? "saturation-value" : "saturation-lightness"
      }
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
        spectrumFormat={spectrumFormat}
        className={handleClasses}
        hue={hue}
        saturation={saturation}
        value={value}
        lightness={lightness}
        x={x}
        y={y}
      />
    </div>
  );
}

export default React.memo(Spectrum);
