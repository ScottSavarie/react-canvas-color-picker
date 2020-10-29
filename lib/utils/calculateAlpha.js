"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var clamp_1 = __importDefault(require("./clamp"));
/**
 * Calculate number between 0 and 1 based on x value
 * of a given width. Additionally round the number to 2 decimal points.
 */
function calculateAlpha(x, width) {
    var clamped = clamp_1.default(x / width, 0, 1);
    var rounded = Number(clamped.toFixed(2));
    return { a: rounded };
}
exports.default = calculateAlpha;
