import clamp from "./clamp";

/**
 * Calculate number between 0 and 360 based on x value
 * of a given width.
 */

export default function calculateHue(x: number, width: number): { h: number } {
  return { h: clamp(360 * (x / width), 0, 360) };
}
