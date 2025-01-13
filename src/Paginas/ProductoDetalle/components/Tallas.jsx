import './Tallas.css';
import { useState } from 'react';
export default function Tallas({tallas,onTallaSelect}){
  const [selectedTalla, setSelectedTalla] = useState('');

  const handleTallaClick = (talla) => {
    setSelectedTalla(talla);
    onTallaSelect(talla);
  };
  return (
    <div className="product-size-container">
      <span>Elija la talla:</span>
                  {tallas.map((talla) => (
        <Talla
          key={talla}
          nombreTalla={talla}
          active={selectedTalla === talla}
          onClick={handleTallaClick}
        />
      ))}
                </div>
  )
}

function Talla({nombreTalla,active,onClick}){
  return (
    <div
      className={`talla-container ${active ? 'active' : 'inactive'}`}
      onClick={() => onClick(nombreTalla)}
    ><span>{nombreTalla}</span></div>
  );
}