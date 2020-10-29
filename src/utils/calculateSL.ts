import clamp from "./clamp";

/**
 * Calculate saturation and lightness of an HSL color gradient
 * given an x,y coordinate and the width and height of the frame
 * that the gradient is rendered in. Clamps values between 0 and 1
 */
export default function calculateSV(
  x: number,
  y: number,
  width: number,
  height: number
): { s: number; l: number } {
  const _y = clamp(y, 0, height);
  return {
    s: clamp(x / width, 0, 1),
    l: clamp(Math.abs(_y - height) / height, 0, 1)
  };
}
