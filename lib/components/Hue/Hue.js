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
var constants_1 = require("../../constants");
var styles = require("./Hue.module.css");
var baseStyles = require("../ColorPicker/ColorPicker.module.css");
function Hue(props) {
    var hue = props.hue, w = props.width, h = props.height, handleClasses = props.handleClasses, className = props.className;
    var dpi = window.devicePixelRatio || 1;
    var width = w * dpi;
    var height = h * dpi;
    var x = width * (hue / 360);
    var canvasRef = React.useRef(null);
    React.useEffect(function () {
        var currentContext = canvasRef.current
            ? canvasRef.current.getContext("2d")
            : null;
        if (currentContext) {
            var spectrumGradient = currentContext.createLinearGradient(0, 0, width, 0);
            for (var i = 0; i <= 360; i += 30) {
                spectrumGradient.addColorStop(i / 360, "hsl(" + i + ", 100%, 50%)");
            }
            currentContext.fillStyle = spectrumGradient;
            currentContext.fillRect(0, 0, width, height);
        }
    }, [width, height, dpi, x, hue]);
    return (React.createElement("div", { id: "hue", className: constants_1.COLOR_PICKER_CLASSNAME + " " + styles.container + " " + baseStyles.color_picker + " " + className },
        React.createElement("canvas", { ref: canvasRef, width: width, height: height, style: {
                width: width / dpi + "px",
                height: height / dpi + "px",
            } }),
        React.createElement(Handle_1.default, { className: handleClasses, hue: hue, x: x, y: height / 2 })));
}
exports.default = React.memo(Hue);
