import { COLOR, HSLA_FORMAT, HSVA_FORMAT, HSLA, HSVA } from "../types";
const tinycolor = require("tinycolor2");

export default function formatColorBySpectrum(
  color: COLOR,
  spectrum: HSLA_FORMAT | HSVA_FORMAT
): HSLA | HSVA {
  const newColor =
    spectrum === "hsva" ? tinycolor(color).toHsv() : tinycolor(color).toHsl();

  // @ts-ignore
  const { h, s, v, l } = color;

  // Restore s value if they v, l were at min or max
  if (
    (typeof v === "number" && v === 0) ||
    (typeof l === "number" && l === 0)
  ) {
    newColor.s = s;
  }
  if (h) {
    newColor.h = h;
  }

  return newColor;
}
