import { PanEvent, HSLA, HSVA } from "../types/index";
import { calculateChanges } from "./index";

export default function getColorChange(
  event: PanEvent,
  currentColor: HSLA | HSVA
) {
  const changes = calculateChanges(event);
  const newColor = { ...currentColor, ...changes };
  if (JSON.stringify(newColor) === JSON.stringify(currentColor)) {
    return currentColor;
  }
  return newColor;
}
