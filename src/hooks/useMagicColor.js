import React, { useState, useEffect } from 'react';

function randomColor() {
  return 'green';
}

function useMagicColor(props) {
  const [color, setColor] = useState('transparent');
  // Change color every 1 second
  useEffect(() => {
    const colorInterval = setInterval(() => {
      const newColor = randomColor();
      setColor(newColor);
    }, 1000);

    return () => {
      clearInterval(colorInterval);
    }
  }, [])
  return color;
}

export default useMagicColor;