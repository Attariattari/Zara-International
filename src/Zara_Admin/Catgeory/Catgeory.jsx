import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import colorNames from "color-name";

function Catgeory() {
  const [color, setColor] = useState("#000000");
  const [colorName, setColorName] = useState("");

  const handleColorChange = (newColor) => {
    setColor(newColor);
    const name = hexToColorName(newColor);
    setColorName(name);
  };

  const hexToColorName = (hex) => {
    const rgb = parseInt(hex.slice(1), 16); // Convert hex to integer
    const r = (rgb >> 16) & 0xff; // Get red component
    const g = (rgb >> 8) & 0xff; // Get green component
    const b = (rgb >> 0) & 0xff; // Get blue component

    let closestColorName = "Unknown Color";
    let minDistance = Infinity;

    for (const [name, rgbValues] of Object.entries(colorNames)) {
      const distance = Math.sqrt(
        Math.pow(rgbValues[0] - r, 2) +
          Math.pow(rgbValues[1] - g, 2) +
          Math.pow(rgbValues[2] - b, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestColorName = name;
      }
    }

    return closestColorName;
  };

  return (
    <div style={{ padding: "1rem" }}>
      <HexColorPicker color={color} onChange={handleColorChange} />
      <p>Selected Color: {color}</p>
      <p>Color Name: {colorName}</p>
    </div>
  );
}

export default Catgeory;
