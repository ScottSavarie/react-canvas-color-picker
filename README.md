![Image of Color Picker](https://github.com/ScottSavarie/react-canvas-color-picker/blob/images/images/colorpicker.png?raw=true)

# React Canvas Color Picker

Simple, fast, customizable canvas based color picker built in React. Supports `HSLA`, `HSVA` color spectrums, and `hsla`, `hsva`, `rgba`, `hex`, and `hex8` color formats.

## Basic Usage

```
yarn add react-canvas-color-picker

or

npm i react-canvas-color-picker

```

```
import React, { useState, useRef, useCallback } from "react";
import { ColorPicker } from "react-canvas-color-picker";


function App() {
  const [color, setColor] = useState({ r: 255, g: 255, b: 255, a: 1 });
  const formats = useRef(["rgba"]);

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
| `formats`         | no       | `COLOR_FORMATS[]` ex: `["rgba", hsla"]`    | `["rgba"]`                         | Array of color formats sent in callback functions     |
| `spectrum`        | no       | `hsva                                      | hsla`                              | `hsva`                                                | Specify which color spectrum to use |
| `spectrumWidth`   | no       | `number`                                   | `240`                              | Sets width of color box and sliders                   |
| `spectrumHeight`  | no       | `number`                                   | `240`                              | Sets height of color box                              |
| `sliderHeight`    | no       | `number`                                   | `14`                               | Sets height of hue and alpha sliders                  |
| `className`       | no       | `string`                                   | `undefined`                        | Additional classes for parent container               |
| `spectrumClasses` | no       | `string`                                   | `undefined`                        | Additional classes for hsla / hsva spectrum container |
| `hueClasses`      | no       | `string`                                   | `undefined`                        | Additional classes for hue slider container           |
| `alphaClasses`    | no       | `string`                                   | `undefined`                        | Additional classes for alpha slider container         |
| `handleClasses`   | no       | `string`                                   | `undefined`                        | Additional classes for slider and spectrum handles    |
| `onPanStart`      | no       | `(event: colorPickerChangeEvent) => void`  | `undefined`                        | Callback function when pan starts                     |
| `onPan`           | no       | `(event: colorPickerChangeEvent) => void`  | `undefined`                        | Callback function on pan                              |
| `onPanEnd`        | no       | `(event: colorPickerChangeEvent) => void`  | `undefined`                        | Callback function when pan ends                       |

## Change Events

`onPanStart`, `onPan`, and `onPanEnd` all return an object containing the colors specified in the `formats` prop, and the `id` of the spectrum or slider that was panned with.

```
{
  colors: object;
  canvasId: string;
}
```

## Advanced Usage

See: https://codesandbox.io/s/react-canvas-color-picker-q4heh?file=/src/App.tsx:1280-1429
