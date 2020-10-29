/**
 * Calculate saturation and value of an HSV color gradient
 * given an x,y coordinate and the width and height of the frame
 * that the gradient is rendered in. Clamps values between 0 and 1
 */
export default function calculateSV(x: number, y: number, width: number, height: number): {
    s: number;
    v: number;
};
