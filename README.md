![Image of Color Picker](https://github.com/ScottSavarie/react-canvas-color-picker/blob/images/images/colorpicker.png?raw=true)

# React Canvas Color Picker

Simple, fast, customizable canvas based color picker built in React. Supports `HSLA`, `HSVA` color spectrums, and `hsla`, `hsva`, `rgba`, `hex`, and `hex8` color formats.

## Install

### npm

```
npm install react-canvas-color-picker
```

### yarn

```
yarn add react-canvas-color-picker
```

## Basic Usage

```
import React, { useState, useRef, useCallback } from "react";
import { ColorPicker, ColorFormats } from "react-canvas-color-picker";

export default function App() {
  const [color, setColor] = useState({ r: 255, g: 255, b: 255, a: 1 });
  const formats = useRef<ColorFormats[]>(["rgba"]);

  const handleChange = useCallback(({ colors }) => {
    setColor({ ...colors.rgba });
  }, []);

  return (
    <ColorPicker
      spectrum="hsva"
      formats={formats.current}
      initialColor={color}
      onPanStart={handleChange}
      onPan={handleChange}
    />
  );
}
```

## Props

| Prop              | Required | Type                                       | Default                            | Description                                           |
| ----------------- | -------- | ------------------------------------------ | ---------------------------------- | ----------------------------------------------------- |
| `initialColor`    | no       | `RGBA`, `HSLA`, `HSVA`, `HEX`, `CSS Color` | `{ r: 255, g: 255, b: 255, a: 1 }` | Color the color picker will mount with                |
| `formats`         | no       | `ColorFormats[]` ex: `["rgba", hsla"]`     | `["rgba"]`                         | Array of color formats sent in callback functions     |
| `spectrum`        | no       | `"hsva"` or `"hsla"`                       | `hsva`                             | Specify which color spectrum to use                   |
| `spectrumWidth`   | no       | `number`                                   | `240`                              | Sets width of color box and sliders                   |
| `spectrumHeight`  | no       | `number`                                   | `240`                              | Sets height of color box                              |
| `sliderHeight`    | no       | `number`                                   | `14`                               | Sets height of hue and alpha sliders                  |
| `className`       | no       | `string`                                   | `undefined`                        | Additional classes for parent container               |
| `spectrumClasses` | no       | `string`                                   | `undefined`                        | Additional classes for hsla / hsva spectrum container |
| `hueClasses`      | no       | `string`                                   | `undefined`                        | Additional classes for hue slider container           |
| `alphaClasses`    | no       | `string`                                   | `undefined`                        | Additional classes for alpha slider container         |
| `handleClasses`   | no       | `string`                                   | `undefined`                        | Additional classes for slider and spectrum handles    |
| `hideAlpha`       | no       | `boolean`                                  | `false`                            | Removes the alpha selector                            |
| `onPanStart`      | no       | `(event: colorPickerChangeEvent) => void`  | `undefined`                        | Callback function when pan starts                     |
| `onPan`           | no       | `(event: colorPickerChangeEvent) => void`  | `undefined`                        | Callback function on pan                              |
| `onPanEnd`        | no       | `(event: colorPickerChangeEvent) => void`  | `undefined`                        | Callback function when pan ends                       |

## Change Events

`onPanStart`, `onPan`, and `onPanEnd` all return an object containing the colors specified in the `formats` prop, and the `id` of the spectrum or slider that was panned with. Note: make sure to wrap handlers in `useCallback`.

```
{
  colors: object;
  canvasId: string;
}
```

## `setColor`

Sometimes you'll want to set the color of the color picker after it's been mounted (imagine changing a hex input, or clicking a color swatch). For this use case there is a `setColor` method which can be access by passing a ref to the color picker.

```
import React, { useRef } from "react";
import { ColorPicker, SetColor } from "react-canvas-color-picker";

export default function App() {
  const colorPickerRef = useRef<SetColor>();

  const setRandomColor = () => {
    const newColor = {
      r: Math.random() * 255,
      g: Math.random() * 255,
      b: Math.random() * 255,
      a: 1
    };
    colorPickerRef.current?.setColor(newColor);
  };

  return (
    <>
      <ColorPicker ref={colorPickerRef} />
      <button onClick={setRandomColor}>Random Color</button>
    </>
  );
}
```

## Advanced Example

### See: https://codesandbox.io/s/react-canvas-color-picker-q4heh?file=/src/App.tsx:1280-1429
