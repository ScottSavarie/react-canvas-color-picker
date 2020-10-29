## Basic Usage

```
import React, { useState, useRef, useCallback } from "react";
import { ColorPicker } from "react-canvas-color-picker";


function App() {
  const [color, setColor] = useState({ r: 255, g: 255, b: 255, a: 1 });
  const formats = useRef(["rgba"]);
   
  const handleChange = useCallback(({ colors }) => {
    setColor((state) => ({ ...state, ...colors.rgba }));
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
