"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var Handle_1 = __importDefault(require("../Handle/Handle"));
var utils_1 = require("../../utils");
var constants_1 = require("../../constants");
var styles = require("./Alpha.module.css");
var baseStyles = require("../ColorPicker/ColorPicker.module.css");
function Alpha(props) {
    var hue = props.hue, alpha = props.alpha, saturation = props.saturation, lightness = props.lightness, value = props.value, spectrum = props.spectrum, w = props.width, h = props.height, handleClasses = props.handleClasses, className = props.className;
    var dpi = window.devicePixelRatio || 1;
    var width = w * dpi;
    var height = h * dpi;
    var x = width * alpha;
    var canvasRef = React.useRef(null);
    var gradientColor = spectrum === "hsla"
        ? {
            h: hue,
            s: saturation,
            l: lightness,
            a: 1,
        }
        : utils_1.formatColorBySpectrum({
            h: hue,
            s: saturation,
            v: value,
            a: 1,
        }, "hsla");
    React.useEffect(function () {
        var currentContext = canvasRef.current
            ? canvasRef.current.getContext("2d")
            : null;
        if (currentContext) {
            currentContext.clearRect(0, 0, width, height);
            var gradient = currentContext.createLinearGradient(0, 0, width, 0);
            gradient.addColorStop(0, "hsla(" + gradientColor.h + ", " + gradientColor.s * 100 + "%, " + gradientColor.l * 100 + "%, 0%)");
            gradient.addColorStop(1, "hsla(" + gradientColor.h + ", " + gradientColor.s * 100 + "%, " + gradientColor.l * 100 + "%, 100%)");
            currentContext.fillStyle = gradient;
            currentContext.fillRect(0, 0, width, height);
        }
        return function () { };
    }, [hue, x, dpi, height, width, gradientColor]);
    return (React.createElement("div", { id: "alpha", className: constants_1.COLOR_PICKER_CLASSNAME + " " + styles.container + " " + baseStyles.color_picker + " " + className },
        React.createElement("canvas", { style: {
                width: width / dpi + "px",
                height: height / dpi + "px",
            }, width: width, height: height, ref: canvasRef }),
        React.createElement(Handle_1.default, { className: handleClasses, hue: gradientColor.h, alpha: alpha, saturation: gradientColor.s, lightness: gradientColor.l, spectrumFormat: "hsla", x: x, y: height / 2 })));
}
exports.default = React.memo(Alpha);
