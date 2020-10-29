"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getRelativeCoords(mouseX, mouseY, rectX, rectY, dpi) {
    return {
        x: (mouseX - rectX) * dpi,
        y: (mouseY - rectY) * dpi
    };
}
exports.default = getRelativeCoords;
