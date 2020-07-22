import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss'
ColorBox.propTypes = {
  
};

function getRandomColor() {
  const COLOR_LIST = ['deeppink', 'green', 'yellow', 'black', 'blue'];
  const randomIndex = Math.trunc(Math.random() * 5);
  return COLOR_LIST[randomIndex]
}

function ColorBox() {
  
  const [color, setColor] = useState(() => {
    const initColor = localStorage.getItem('box_color') || 'deeppink';
    return initColor;
  });

  
  function hanldeBoxClick() {
    
    const newColor = getRandomColor();
    setColor(newColor);
    localStorage.setItem('box_color', newColor);
  }

  return (
    <div
      className="color-box"
      style={{ backgroundColor: color }}
      onClick={hanldeBoxClick}
    >
    </div>
  );
}

export default ColorBox;