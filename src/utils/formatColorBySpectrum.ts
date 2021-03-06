import { Color, HSLAFormat, HSVAFormat, HSLA, HSVA } from "../types";
import tinycolor from "tinycolor2";

export default function formatColorBySpectrum(
  color: Color,
  spectrum: HSLAFormat | HSVAFormat
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
