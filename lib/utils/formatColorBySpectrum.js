"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tinycolor = require("tinycolor2");
function formatColorBySpectrum(color, spectrum) {
    var newColor = spectrum === "hsva" ? tinycolor(color).toHsv() : tinycolor(color).toHsl();
    // @ts-ignore
    var h = color.h, s = color.s, v = color.v, l = color.l;
    // Restore s value if they v, l were at min or max
    if ((typeof v === "number" && v === 0) ||
        (typeof l === "number" && l === 0)) {
        newColor.s = s;
    }
    if (h) {
        newColor.h = h;
    }
    return newColor;
}
exports.default = formatColorBySpectrum;
