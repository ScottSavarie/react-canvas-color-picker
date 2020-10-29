"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var utils_1 = require("../../utils");
var styles = require("./Handle.module.css");
function Handle(props) {
    var _a = props.spectrumFormat, spectrumFormat = _a === void 0 ? "hsva" : _a, x = props.x, y = props.y, hue = props.hue, _b = props.saturation, saturation = _b === void 0 ? 1 : _b, _c = props.value, value = _c === void 0 ? 1 : _c, _d = props.alpha, alpha = _d === void 0 ? 1 : _d, _e = props.lightness, lightness = _e === void 0 ? 0.5 : _e, className = props.className;
    var dpi = window.devicePixelRatio || 1;
    var bgColor = spectrumFormat === "hsla"
        ? {
            h: hue,
            s: saturation,
            l: lightness,
            a: alpha
        }
        : utils_1.formatColorBySpectrum({
            h: hue,
            s: saturation,
            v: value,
            a: alpha
        }, "hsla");
    return (React.createElement("div", { className: styles.container + " " + className, style: {
            transform: "translate(-50%, -50%) translate(" + x / dpi + "px, " + y / dpi + "px)"
        } },
        React.createElement("div", { className: styles.handle, style: {
                backgroundColor: "hsla(" + bgColor.h + ", " + bgColor.s *
                    100 + "%, " + bgColor.l * 100 + "%, " + bgColor.a + ")"
            } })));
}
exports.default = React.memo(Handle);
