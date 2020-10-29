import { PAN_EVENT, HSLA, HSVA } from "../types/index";
import { calculateChanges } from "./index";

export default function getColorChange(
  event: PAN_EVENT,
  currentColor: HSLA | HSVA
) {
  const changes = calculateChanges(event);
  const newColor = { ...currentColor, ...changes };
  if (JSON.stringify(newColor) === JSON.stringify(currentColor)) {
    return currentColor;
  }
  return newColor;
}
