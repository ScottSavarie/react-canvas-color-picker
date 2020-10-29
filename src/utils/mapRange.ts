export default function mapRange(
  value: number,
  inputStart: number,
  inputEnd: number,
  outputStart: number,
  outputEnd: number
) {
  if (value < inputStart) {
    return outputStart;
  } else if (value > inputEnd) {
    return outputEnd;
  } else
    return (
      outputStart +
      ((outputEnd - outputStart) * (value - inputStart)) /
        (inputEnd - inputStart)
    );
}
