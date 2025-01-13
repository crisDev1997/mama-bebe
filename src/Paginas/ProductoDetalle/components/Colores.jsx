import { useState } from 'react';
import { colors } from '../../../data/const';
import './Colores.css';

export default function Colores({ colores,onColorSelect  }) {
  const [selectedColor, setSelectedColor] = useState('');

  const handleColorClick = (color) => {
    setSelectedColor(color);
    onColorSelect(color);
  };
  return (
    <div className="colors-container">
      <span>Seleccione el color:</span>
      {colores.map((color) => (
        <Color
          key={color}
          nombreColor={color}
          active={selectedColor === color}
          onClick={handleColorClick}
        />
      ))}
    </div>
  );
}

function Color({ nombreColor, active, onClick }) {
  const setColor = (color) => {
    const aux = colors.find((c) => c.nombre === color);
    return aux ? aux.color : '';
  };

  return (
    <div
      className={`color-container ${active ? 'active' : 'inactive'}`}
      style={{ backgroundColor: setColor(nombreColor) }}
      onClick={() => onClick(nombreColor)}
    ></div>
  );
}
