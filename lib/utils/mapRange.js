"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mapRange(value, inputStart, inputEnd, outputStart, outputEnd) {
    if (value < inputStart) {
        return outputStart;
    }
    else if (value > inputEnd) {
        return outputEnd;
    }
    else
        return (outputStart +
            ((outputEnd - outputStart) * (value - inputStart)) /
                (inputEnd - inputStart));
}
exports.default = mapRange;
