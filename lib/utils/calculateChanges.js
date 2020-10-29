"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
function calculateChanges(panEvent) {
    var panX = panEvent.panX, panY = panEvent.panY, width = panEvent.width, height = panEvent.height, dpi = panEvent.dpi, elementId = panEvent.elementId;
    var changes = {};
    switch (elementId) {
        case "saturation-value":
            changes = index_1.calculateSV(panX, panY, width * dpi, height * dpi);
            break;
        case "saturation-lightness":
            changes = index_1.calculateSL(panX, panY, width * dpi, height * dpi);
            break;
        case "hue":
            changes = index_1.calculateHue(panX, width * dpi);
            break;
        case "alpha":
            changes = index_1.calculateAlpha(panX, width * dpi);
            break;
        default:
            break;
    }
    return changes;
}
exports.default = calculateChanges;
