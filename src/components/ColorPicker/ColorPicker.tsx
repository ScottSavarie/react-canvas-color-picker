import * as React from "react";

import Hue from "../Hue/Hue";
import Spectrum from "../Spectrum/Spectrum";
import Alpha from "../Alpha/Alpha";

import usePanClosestElement from "../../hooks/usePanClosestElement";

import { COLOR_PICKER_CLASSNAME } from "../../constants/index";

import {
  formatColorBySpectrum,
  getColorChanges,
  getColorFormats,
} from "../../utils/index";

import {
  HSVAFormat,
  HSLAFormat,
  HSLA,
  HSVA,
  Color,
  ColorFormats,
  ColorPickerSpectrum,
  Colors,
} from "../../types/index";

import styles from "./ColorPicker.module.css";

type colorPickerChangeEvent = {
  colors: Colors;
  canvasId: string;
};

type ColorPickerProps = {
  initialColor?: Color; // Color the color picker will mount with - Default white
  formats?: ColorFormats[]; // Array of color formats sent in callback functions. note: use state or memoized array to avoid rerenders
  spectrum?: HSVAFormat | HSLAFormat; // Specify which color spectrum to use - default HSVA
  spectrumWidth?: number; // Sets width of color box and sliders - default 240
  spectrumHeight?: number; // Sets height of color box - default 240
  sliderWidth?: number; // Sets width of hue and alpha sliders - default 240
  sliderHeight?: number; // Sets height of hue and alpha sliders - default 14
  className?: string; // classes for parent container
  spectrumClasses?: string; // classes for hsla / hsva spectrum container
  hueClasses?: string; // classes for hue slider container
  alphaClasses?: string; // classes for alpha slider container
  handleClasses?: string; // classes for handles
  hideAlpha?: boolean; // show or hide alpha - default false
  onPanStart?: (event: colorPickerChangeEvent) => void; // Callback function - Note: useCallback to avoid rerenders
  onPan?: (event: colorPickerChangeEvent) => void; // Callback function - Note: useCallback to avoid rerenders
  onPanEnd?: (event: colorPickerChangeEvent) => void; // Callback function - Note: useCallback to avoid rerenders
};

const defaultFormats = ["rgba"] as ColorFormats[];
const defaultColor = { r: 255, g: 255, b: 255, a: 1 };

const ColorPicker = React.forwardRef((props: ColorPickerProps, ref) => {
  const {
    initialColor = defaultColor,
    spectrumWidth = 240,
    spectrumHeight = 240,
    sliderWidth = 240,
    sliderHeight = 14,
    spectrum = "hsva",
    formats = defaultFormats,
    className,
    spectrumClasses,
    hueClasses,
    alphaClasses,
    handleClasses,
    hideAlpha = false,
    onPanStart,
    onPan,
    onPanEnd,
  } = props;

  const [color, setColor] = React.useState<ColorPickerSpectrum>(() => {
    return formatColorBySpectrum(initialColor, spectrum);
  });

  const isFirstRender = React.useRef(true);
  const colorRef = React.useRef(color as HSLA | HSVA);
  React.useEffect(() => {
    colorRef.current = color as HSLA | HSVA;
  });

  // Store spectrum in ref so changes don't cause handles to jump before new color is set
  const spectrumRef = React.useRef(spectrum);
  React.useEffect(() => {
    spectrumRef.current = spectrum;
  }, [spectrum]);

  const sendChanges = React.useCallback(() => {
    const colors = getColorFormats(colorRef.current, formats);
    if (onPan) {
      onPan({ colors, canvasId: "none" });
    } else if (onPanEnd) {
      onPanEnd({ colors, canvasId: "none" });
    } else if (onPanStart) {
      onPanStart({ colors, canvasId: "none" });
    }
  }, [onPan, onPanEnd, onPanStart, formats]);

  const sendChangesRef = React.useRef(sendChanges);
  React.useEffect(() => {
    sendChangesRef.current = sendChanges;
  }, [sendChanges]);

  const handlePanStart = React.useCallback(
    (event) => {
      const newColor = getColorChanges(event, colorRef.current);
      setColor(newColor);

      if (onPanStart) {
        const colors = getColorFormats(newColor, formats);

        onPanStart({ colors, canvasId: event.elementId });
      }
    },
    [onPanStart, formats]
  );

  const handlePan = React.useCallback(
    (event) => {
      const newColor = getColorChanges(event, colorRef.current);
      setColor(newColor);

      if (onPan) {
        const colors = getColorFormats(newColor, formats);
        onPan({ colors, canvasId: event.elementId });
      }
    },
    [onPan, formats]
  );

  const handlePanEnd = React.useCallback(
    (event) => {
      const newColor = getColorChanges(event, colorRef.current);
      setColor(newColor);

      if (onPanEnd) {
        const colors = getColorFormats(newColor, formats);

        onPanEnd({ colors, canvasId: event.elementId });
      }
    },
    [onPanEnd, formats]
  );

  usePanClosestElement({
    className: COLOR_PICKER_CLASSNAME,
    onPanStart: handlePanStart,
    onPan: handlePan,
    onPanEnd: handlePanEnd,
  });

  // When spectrum is updated, reset the local color
  React.useEffect(() => {
    setColor((state) => {
      if (typeof spectrum !== "undefined") {
        return formatColorBySpectrum(state as Color, spectrum);
      }
      return state;
    });
  }, [spectrum]);

  // When the formats change, send the new colors in callback
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      sendChangesRef.current();
    }
  }, [formats]);

  // Imperative handler to externally set the color after mount
  React.useImperativeHandle(ref, () => ({
    setColor: (col: Color) => {
      setColor(formatColorBySpectrum(col, spectrum));
    },
  }));

  return (
    <div className={`${styles.container} ${className}`}>
      <Spectrum
        spectrumFormat={spectrumRef.current}
        hue={color.h}
        saturation={color.s}
        lightness={color.l}
        value={color.v}
        width={spectrumWidth}
        height={spectrumHeight}
        className={spectrumClasses}
        handleClasses={handleClasses}
      />
      <Hue
        hue={color.h}
        width={sliderWidth}
        height={sliderHeight}
        className={hueClasses}
        handleClasses={handleClasses}
      />
      {!hideAlpha && (
        <Alpha
          hue={color.h}
          saturation={color.s}
          lightness={color.l}
          value={color.v}
          alpha={color.a}
          width={sliderWidth}
          spectrum={spectrumRef.current}
          height={sliderHeight}
          className={alphaClasses}
          handleClasses={handleClasses}
        />
      )}
    </div>
  );
});

export default React.memo(ColorPicker);
