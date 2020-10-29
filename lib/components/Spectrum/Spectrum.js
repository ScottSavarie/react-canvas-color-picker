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
var styles = require("./Spectrum.module.css");
var baseStyles = require("../ColorPicker/ColorPicker.module.css");
function Spectrum(props) {
    var spectrumFormat = props.spectrumFormat, hue = props.hue, saturation = props.saturation, _a = props.value, value = _a === void 0 ? 1 : _a, _b = props.lightness, lightness = _b === void 0 ? 1 : _b, w = props.width, h = props.height, className = props.className, handleClasses = props.handleClasses;
    var dpi = window.devicePixelRatio || 1;
    var width = w * dpi;
    var height = h * dpi;
    var x = width * saturation;
    var yInput = spectrumFormat === "hsva" ? value : lightness;
    var y = height * utils_1.mapRange(yInput, 0, 1, 1, 0);
    var canvasRef = React.useRef(null);
    React.useEffect(function () {
        var currentContext = canvasRef.current
            ? canvasRef.current.getContext("2d")
            : null;
        if (currentContext) {
            if (spectrumFormat === "hsva") {
                currentContext.fillStyle = "hsl(" + hue + ", 100%, 50%)";
                currentContext.fillRect(0, 0, width, height);
                var whiteGradient = currentContext.createLinearGradient(0, 0, width, 0);
                whiteGradient.addColorStop(0, "hsla(0,0%,100%, 100%)");
                whiteGradient.addColorStop(1, "hsla(0,0%,100%, 0%)");
                currentContext.fillStyle = whiteGradient;
                currentContext.fillRect(0, 0, width, height);
                var blackGradient = currentContext.createLinearGradient(0, height, 0, 0);
                blackGradient.addColorStop(0, "hsla(0,0%,0%, 100%)");
                blackGradient.addColorStop(1, "hsla(0,0%,0%, 0%");
                currentContext.fillStyle = blackGradient;
                currentContext.fillRect(0, 0, width, height);
            }
            else {
                for (var row = 0; row < height; row++) {
                    var gradient = currentContext.createLinearGradient(0, 0, width, 0);
                    gradient.addColorStop(0, "hsl(" + hue + ", 0%, " + (1 - row / height) * 100 + "%)");
                    gradient.addColorStop(1, "hsl(" + hue + ", 100%, " + (1 - row / height) * 100 + "%)");
                    currentContext.fillStyle = gradient;
                    currentContext.fillRect(0, row, width, 1);
                }
            }
        }
    }, [hue, width, height, spectrumFormat]);
    return (React.createElement("div", { id: spectrumFormat === "hsva" ? "saturation-value" : "saturation-lightness", className: constants_1.COLOR_PICKER_CLASSNAME + " " + styles.container + " " + baseStyles.color_picker + " " + className },
        React.createElement("canvas", { style: {
                width: width / dpi + "px",
                height: height / dpi + "px",
            }, width: width, height: height, ref: canvasRef }),
        React.createElement(Handle_1.default, { spectrumFormat: spectrumFormat, className: handleClasses, hue: hue, saturation: saturation, value: value, lightness: lightness, x: x, y: y })));
}
exports.default = React.memo(Spectrum);
