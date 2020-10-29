import { HSVA, HSLA, COLOR_FORMATS, COLORS } from "../types";
import tinycolor from "tinycolor2";

export default function getColorFormats(
  color: HSVA | HSLA,
  formats: COLOR_FORMATS[]
): COLORS {
  const formatsLength = formats.length;
  let colors = {};

  for (let i = 0; i < formatsLength; i++) {
    const format = formats[i];

    switch (format) {
      case "rgba":
        colors = { ...colors, rgba: tinycolor(color).toRgb() };
        break;
      case "hex":
        colors = { ...colors, hex: tinycolor(color).toHexString() };
        break;
      case "hex8":
        colors = { ...colors, hex8: tinycolor(color).toHex8String() };
        break;
      case "hsla":
        colors = { ...colors, hsla: tinycolor(color).toHsl() };
        break;
      case "hsva":
        colors = { ...colors, hsva: color };
        break;
      default:
        continue;
    }
  }
  return colors;
}
