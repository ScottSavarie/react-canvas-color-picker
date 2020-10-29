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
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
function getColorChange(event, currentColor) {
    var changes = index_1.calculateChanges(event);
    var newColor = __assign(__assign({}, currentColor), changes);
    if (JSON.stringify(newColor) === JSON.stringify(currentColor)) {
        return currentColor;
    }
    return newColor;
}
exports.default = getColorChange;
