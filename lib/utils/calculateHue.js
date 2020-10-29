"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var clamp_1 = __importDefault(require("./clamp"));
/**
 * Calculate number between 0 and 360 based on x value
 * of a given width.
 */
function calculateHue(x, width) {
    return { h: clamp_1.default(360 * (x / width), 0, 360) };
}
exports.default = calculateHue;
