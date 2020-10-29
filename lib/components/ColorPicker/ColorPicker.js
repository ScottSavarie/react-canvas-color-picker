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
var Hue_1 = __importDefault(require("../Hue/Hue"));
var Spectrum_1 = __importDefault(require("../Spectrum/Spectrum"));
var Alpha_1 = __importDefault(require("../Alpha/Alpha"));
var usePanClosestElement_1 = __importDefault(require("../../hooks/usePanClosestElement"));
var index_1 = require("../../constants/index");
var index_2 = require("../../utils/index");
var styles = require("./ColorPicker.module.css");
var defaultFormats = ["rgba"];
var defaultColor = { r: 255, g: 255, b: 255, a: 1 };
var ColorPicker = React.forwardRef(function (props, ref) {
    var _a = props.initialColor, initialColor = _a === void 0 ? defaultColor : _a, _b = props.spectrumWidth, spectrumWidth = _b === void 0 ? 240 : _b, _c = props.spectrumHeight, spectrumHeight = _c === void 0 ? 240 : _c, _d = props.sliderWidth, sliderWidth = _d === void 0 ? 240 : _d, _e = props.sliderHeight, sliderHeight = _e === void 0 ? 14 : _e, _f = props.spectrum, spectrum = _f === void 0 ? "hsva" : _f, _g = props.formats, formats = _g === void 0 ? defaultFormats : _g, className = props.className, spectrumClasses = props.spectrumClasses, hueClasses = props.hueClasses, alphaClasses = props.alphaClasses, handleClasses = props.handleClasses, onPanStart = props.onPanStart, onPan = props.onPan, onPanEnd = props.onPanEnd;
    var _h = React.useState(function () {
        return index_2.formatColorBySpectrum(initialColor, spectrum);
    }), color = _h[0], setColor = _h[1];
    var isFirstRender = React.useRef(true);
    var colorRef = React.useRef(color);
    React.useEffect(function () {
        colorRef.current = color;
    });
    // Store spectrum in ref so changes don't cause handles to jump before new color is set
    var spectrumRef = React.useRef(spectrum);
    React.useEffect(function () {
        spectrumRef.current = spectrum;
    }, [spectrum]);
    var sendChanges = React.useCallback(function () {
        var colors = index_2.getColorFormats(colorRef.current, formats);
        if (onPan) {
            onPan({ colors: colors, canvasId: "none" });
        }
        else if (onPanEnd) {
            onPanEnd({ colors: colors, canvasId: "none" });
        }
        else if (onPanStart) {
            onPanStart({ colors: colors, canvasId: "none" });
        }
    }, [onPan, onPanEnd, onPanStart, formats]);
    var sendChangesRef = React.useRef(sendChanges);
    React.useEffect(function () {
        sendChangesRef.current = sendChanges;
    }, [sendChanges]);
    var handlePanStart = React.useCallback(function (event) {
        var newColor = index_2.getColorChanges(event, colorRef.current);
        setColor(newColor);
        if (onPanStart) {
            var colors = index_2.getColorFormats(newColor, formats);
            onPanStart({ colors: colors, canvasId: event.elementId });
        }
    }, [onPanStart, formats]);
    var handlePan = React.useCallback(function (event) {
        var newColor = index_2.getColorChanges(event, colorRef.current);
        setColor(newColor);
        if (onPan) {
            var colors = index_2.getColorFormats(newColor, formats);
            onPan({ colors: colors, canvasId: event.elementId });
        }
    }, [onPan, formats]);
    var handlePanEnd = React.useCallback(function (event) {
        var newColor = index_2.getColorChanges(event, colorRef.current);
        setColor(newColor);
        if (onPanEnd) {
            var colors = index_2.getColorFormats(newColor, formats);
            onPanEnd({ colors: colors, canvasId: event.elementId });
        }
    }, [onPanEnd, formats]);
    usePanClosestElement_1.default({
        className: index_1.COLOR_PICKER_CLASSNAME,
        onPanStart: handlePanStart,
        onPan: handlePan,
        onPanEnd: handlePanEnd,
    });
    // When spectrum is updated, reset the local color
    React.useEffect(function () {
        setColor(function (state) {
            if (typeof spectrum !== "undefined") {
                return index_2.formatColorBySpectrum(state, spectrum);
            }
            return state;
        });
    }, [spectrum]);
    // When the formats change, send the new colors in callback
    React.useEffect(function () {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        }
        else {
            sendChangesRef.current();
        }
    }, [formats]);
    // Imperative handler to externally set the color after mount
    React.useImperativeHandle(ref, function () { return ({
        setColor: function (col) {
            setColor(index_2.formatColorBySpectrum(col, spectrum));
        },
    }); });
    return (React.createElement("div", { className: styles.container + " " + className },
        React.createElement(Spectrum_1.default, { spectrumFormat: spectrumRef.current, hue: color.h, saturation: color.s, lightness: color.l, value: color.v, width: spectrumWidth, height: spectrumHeight, className: spectrumClasses, handleClasses: handleClasses }),
        React.createElement(Hue_1.default, { hue: color.h, width: sliderWidth, height: sliderHeight, className: hueClasses, handleClasses: handleClasses }),
        React.createElement(Alpha_1.default, { hue: color.h, saturation: color.s, lightness: color.l, value: color.v, alpha: color.a, width: sliderWidth, spectrum: spectrumRef.current, height: sliderHeight, className: alphaClasses, handleClasses: handleClasses })));
});
exports.default = React.memo(ColorPicker);
