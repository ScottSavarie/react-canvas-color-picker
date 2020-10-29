"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var index_1 = require("../utils/index");
function usePanClosestElement(_a) {
    var className = _a.className, onPanStart = _a.onPanStart, onPan = _a.onPan, onPanEnd = _a.onPanEnd;
    var canvases = react_1.useRef(document.getElementsByClassName(className));
    react_1.useLayoutEffect(function () {
        var isBrowser = typeof window !== "undefined";
        var isSupported = isBrowser && window && window.addEventListener;
        if (!isSupported)
            return;
        var dpi = window.devicePixelRatio || 1;
        var isPanning = false;
        var elementId = null;
        var bounds = null;
        if (canvases.current.length === 0) {
            canvases.current = document.getElementsByClassName(className);
        }
        function handleDown(event) {
            var clientX = event.clientX, clientY = event.clientY, target = event.target;
            isPanning = true;
            if (target) {
                elementId = target.id;
                bounds = target.getBoundingClientRect();
                if (onPanStart && bounds && elementId) {
                    var top_1 = bounds.top, left = bounds.left, width = bounds.width, height = bounds.height;
                    var _a = index_1.getRelativeCoords(clientX, clientY, left, top_1, dpi), x = _a.x, y = _a.y;
                    onPanStart({ panX: x, panY: y, width: width, height: height, dpi: dpi, elementId: elementId });
                }
            }
        }
        function handleMove(event) {
            if (elementId && isPanning && onPan && bounds) {
                var clientX = event.clientX, clientY = event.clientY;
                var top_2 = bounds.top, left = bounds.left, width = bounds.width, height = bounds.height;
                var _a = index_1.getRelativeCoords(clientX, clientY, left, top_2, dpi), x = _a.x, y = _a.y;
                onPan({ panX: x, panY: y, width: width, height: height, dpi: dpi, elementId: elementId });
            }
        }
        function handleUp(event) {
            if (elementId && isPanning && onPanEnd && bounds) {
                var clientX = event.clientX, clientY = event.clientY;
                var top_3 = bounds.top, left = bounds.left, width = bounds.width, height = bounds.height;
                var _a = index_1.getRelativeCoords(clientX, clientY, left, top_3, dpi), x = _a.x, y = _a.y;
                onPanEnd({ panX: x, panY: y, width: width, height: height, dpi: dpi, elementId: elementId });
            }
            isPanning = false;
            elementId = null;
            bounds = null;
        }
        var canvasesLength = canvases.current.length;
        for (var i = 0; i < canvasesLength; i++) {
            canvases.current[i].addEventListener("pointerdown", handleDown);
        }
        window.addEventListener("pointermove", handleMove);
        window.addEventListener("pointerup", handleUp);
        return function () {
            for (var i = 0; i < canvasesLength; i++) {
                canvases.current[i].removeEventListener("pointerdown", handleDown);
            }
            window.removeEventListener("pointermove", handleMove);
            window.removeEventListener("pointerup", handleUp);
        };
    }, [className, onPanStart, onPan, onPanEnd]);
}
exports.default = usePanClosestElement;
