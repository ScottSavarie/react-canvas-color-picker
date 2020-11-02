import { useLayoutEffect, useRef } from "react";
import { getRelativeCoords } from "../utils/index";

import { Bounds } from "../types/index";

type panEvent = {
  panX: number;
  panY: number;
  width: number;
  height: number;
  dpi: number;
  elementId: string;
};

type usePanClosestElementProps = {
  className: string; // Classname used to target elements
  onPanStart?: (event: panEvent) => void;
  onPan?: (event: panEvent) => void;
  onPanEnd?: (event: panEvent) => void;
};

export default function usePanClosestElement({
  className,
  onPanStart,
  onPan,
  onPanEnd,
}: usePanClosestElementProps): void {
  const canvases = useRef(document.getElementsByClassName(className));

  useLayoutEffect(() => {
    const isBrowser = typeof window !== "undefined";
    const isSupported = isBrowser && window && window.addEventListener;
    if (!isSupported) return;

    const dpi = window.devicePixelRatio || 1;
    let isPanning = false;
    let elementId: string | null = null;
    let bounds: Bounds | null = null;

    if (canvases.current.length === 0) {
      canvases.current = document.getElementsByClassName(className);
    }

    function handleDown(event: any) {
      const { clientX, clientY, target } = event;
      isPanning = true;
      if (target) {
        elementId = target.id;
        bounds = target.getBoundingClientRect();
        if (onPanStart && bounds && elementId) {
          const { top, left, width, height } = bounds;
          const { x, y } = getRelativeCoords(clientX, clientY, left, top, dpi);
          onPanStart({ panX: x, panY: y, width, height, dpi, elementId });
        }
      }
    }

    function handleMove(event: any) {
      if (elementId && isPanning && onPan && bounds) {
        const { clientX, clientY } = event;
        const { top, left, width, height } = bounds;
        const { x, y } = getRelativeCoords(clientX, clientY, left, top, dpi);
        onPan({ panX: x, panY: y, width, height, dpi, elementId });
      }
    }

    function handleUp(event: any) {
      if (elementId && isPanning && onPanEnd && bounds) {
        const { clientX, clientY } = event;
        const { top, left, width, height } = bounds;
        const { x, y } = getRelativeCoords(clientX, clientY, left, top, dpi);
        onPanEnd({ panX: x, panY: y, width, height, dpi, elementId });
      }
      isPanning = false;
      elementId = null;
      bounds = null;
    }

    const canvasesLength = canvases.current.length;
    for (let i = 0; i < canvasesLength; i++) {
      canvases.current[i].addEventListener("pointerdown", handleDown);
    }

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    return () => {
      for (let i = 0; i < canvasesLength; i++) {
        canvases.current[i].removeEventListener("pointerdown", handleDown);
      }
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [className, onPanStart, onPan, onPanEnd]);
}
