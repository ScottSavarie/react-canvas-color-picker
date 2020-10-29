"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var clamp_1 = __importDefault(require("./clamp"));
/**
 * Calculate saturation and lightness of an HSL color gradient
 * given an x,y coordinate and the width and height of the frame
 * that the gradient is rendered in. Clamps values between 0 and 1
 */
function calculateSV(x, y, width, height) {
    var _y = clamp_1.default(y, 0, height);
    return {
        s: clamp_1.default(x / width, 0, 1),
        l: clamp_1.default(Math.abs(_y - height) / height, 0, 1)
    };
}
exports.default = calculateSV;
