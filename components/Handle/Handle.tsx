import * as React from "react";

import { HSLA_FORMAT, HSVA_FORMAT, HSLA } from "../../types";

import { formatColorBySpectrum } from "../../utils";

const styles = require("./Handle.module.css");

type HandleProps = {
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

function Handle(props: HandleProps) {
  const {
    spectrumFormat = "hsva",
    x,
    y,
    hue,
    saturation = 1,
    value = 1,
    alpha = 1,
    lightness = 0.5,
    className
  } = props;
  const dpi = window.devicePixelRatio || 1;

  const bgColor: HSLA =
    spectrumFormat === "hsla"
      ? {
          h: hue,
          s: saturation,
          l: lightness,
          a: alpha
        }
      : (formatColorBySpectrum(
          {
            h: hue,
            s: saturation,
            v: value,
            a: alpha
          },
          "hsla"
        ) as HSLA);

  return (
    <div
      className={`${styles.container} ${className}`}
      style={{
        transform: `translate(-50%, -50%) translate(${x / dpi}px, ${y / dpi}px)`
      }}
    >
      <div
        className={styles.handle}
        style={{
          backgroundColor: `hsla(${bgColor.h}, ${bgColor.s *
            100}%, ${bgColor.l * 100}%, ${bgColor.a})`
        }}
      />
    </div>
  );
}

export default React.memo(Handle);
