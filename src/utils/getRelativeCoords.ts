export default function getRelativeCoords(
  mouseX: number,
  mouseY: number,
  rectX: number,
  rectY: number,
  dpi: number
) {
  return {
    x: (mouseX - rectX) * dpi,
    y: (mouseY - rectY) * dpi
  };
}
