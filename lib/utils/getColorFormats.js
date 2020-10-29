"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tinycolor2_1 = __importDefault(require("tinycolor2"));
function getColorFormats(color, formats) {
    var formatsLength = formats.length;
    var colors = {};
    for (var i = 0; i < formatsLength; i++) {
        var format = formats[i];
        switch (format) {
            case "rgba":
                colors = __assign(__assign({}, colors), { rgba: tinycolor2_1.default(color).toRgb() });
                break;
            case "hex":
                colors = __assign(__assign({}, colors), { hex: tinycolor2_1.default(color).toHexString() });
                break;
            case "hex8":
                colors = __assign(__assign({}, colors), { hex8: tinycolor2_1.default(color).toHex8String() });
                break;
            case "hsla":
                colors = __assign(__assign({}, colors), { hsla: tinycolor2_1.default(color).toHsl() });
                break;
            case "hsva":
                colors = __assign(__assign({}, colors), { hsva: color });
                break;
            default:
                continue;
        }
    }
    return colors;
}
exports.default = getColorFormats;
