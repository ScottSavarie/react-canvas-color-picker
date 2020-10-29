import clamp from "./clamp";

/**
 * Calculate number between 0 and 1 based on x value
 * of a given width. Additionally round the number to 2 decimal points.
 */

export default function calculateAlpha(
  x: number,
  width: number
): { a: number } {
  const clamped = clamp(x / width, 0, 1);
  const rounded = Number(clamped.toFixed(2));

  return { a: rounded };
}
