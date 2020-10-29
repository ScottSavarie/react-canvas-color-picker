"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
}
exports.default = clamp;
