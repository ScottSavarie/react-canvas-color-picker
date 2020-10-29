import { PAN_EVENT } from "../types/index";

import {
  calculateSV,
  calculateSL,
  calculateHue,
  calculateAlpha,
} from "./index";

export default function calculateChanges(panEvent: PAN_EVENT) {
  const { panX, panY, width, height, dpi, elementId } = panEvent;
  let changes = {};
  switch (elementId) {
    case "saturation-value":
      changes = calculateSV(panX, panY, width * dpi, height * dpi);
      break;

    case "saturation-lightness":
      changes = calculateSL(panX, panY, width * dpi, height * dpi);
      break;

    case "hue":
      changes = calculateHue(panX, width * dpi);
      break;

    case "alpha":
      changes = calculateAlpha(panX, width * dpi);
      break;

    default:
      break;
  }
  return changes;
}
