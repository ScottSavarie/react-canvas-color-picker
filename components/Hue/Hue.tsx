import * as React from "react";

import Handle from "../Handle/Handle";

import { COLOR_PICKER_CLASSNAME } from "../../constants";

const styles = require("./Hue.module.css");
const baseStyles = require("../ColorPicker/ColorPicker.module.css");

type HueProps = {
  hue: number;
  width: number;
  height: number;
  className?: string;
  handleClasses?: string;
};

function Hue(props: HueProps) {
  const { hue, width: w, height: h, handleClasses, className } = props;

  const dpi = window.devicePixelRatio || 1;
  const width = w * dpi;
  const height = h * dpi;
  const x = width * (hue / 360);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const currentContext = canvasRef.current
      ? canvasRef.current.getContext("2d")
      : null;
    if (currentContext) {
      let spectrumGradient = currentContext.createLinearGradient(
        0,
        0,
        width,
        0
      );
      for (let i = 0; i <= 360; i += 30) {
        spectrumGradient.addColorStop(i / 360, `hsl(${i}, 100%, 50%)`);
      }
      currentContext.fillStyle = spectrumGradient;
      currentContext.fillRect(0, 0, width, height);
    }
  }, [width, height, dpi, x, hue]);

  return (
    <div
      id="hue"
      className={`${COLOR_PICKER_CLASSNAME} ${styles.container} ${baseStyles.color_picker} ${className}`}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          width: `${width / dpi}px`,
          height: `${height / dpi}px`,
        }}
      />
      <Handle className={handleClasses} hue={hue} x={x} y={height / 2} />
    </div>
  );
}

export default React.memo(Hue);
