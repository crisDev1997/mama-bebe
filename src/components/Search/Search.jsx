import { useState ,} from "react";
import { Tiendas, tiposAccesorios, tiposRopa } from "../../data/const";
import {useNavigate,useLocation} from 'react-router-dom'
import { useProductContext } from "../../Context/ProductContext/useProductContext";

import "./Search.css";

export default function Search({ align, enableFilters }) {
  const [texto, setTexto] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { filterProducts, setProdFiltered } = useProductContext();

 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (texto.length === 0) {
      setProdFiltered([]);
      return;
    }
    filterProducts({ nombre: texto });

    const searchParams = new URLSearchParams(location.search);
    searchParams.set('search', texto);
    navigate(`/catalogo?${searchParams.toString()}`);
  };

  return (
    <div className="search-container">
      <div className={`search ${align ? align : ""}`} id="search">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name=""
            id=""
            maxLength={35}
            placeholder="Busca los productos aquí"
            onChange={(e)=>setTexto(e.target.value)}
            value={texto}
            onKeyDown={(e)=>{if(e.key=='Enter'){handleSubmit(e)}}}
          />
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
      {/* {enableFilters == true ? <div className="filters-section"><Filters /></div>  : <></>} */}
    </div>
  );
}

function Filters() {
  const tRopa = tiposRopa.map((tipoRopa) => {
    return (
      <div className="filter-option" key={tipoRopa.name}>
        <input type="checkbox" className="checkbox-option" id="miCheckbox" />
        <span>{tipoRopa.name}</span>
      </div>
    );
  });
  const tAccesorios = tiposAccesorios.map((tipoAccesorio) => {
    return (
      <div className="filter-option" key={tipoAccesorio.name}>
        <input type="checkbox" className="checkbox-option" id="miCheckbox" />
        <span>{tipoAccesorio.name}</span>
      </div>
    );
  });
  return (
    <>
      <span className="filter-title-header">Filtre su busqueda por:</span>
      <div className="filter-types">
        <div className="filter-type">
          <span className="filter-subtitle">Marcas</span>
          {Tiendas.map((tienda, index) => {
            
            if (index % 2 === 0) {
              return (
                <div className="filter-row" key={index}>
                  <div className="filter-option">
                    <input
                      type="checkbox"
                      className="checkbox-option"
                      id={`miCheckbox${index}`}
                    />
                    <span>{Tiendas[index].name}</span>
                  </div>
                  {index + 1 < Tiendas.length && (
                    <div className="filter-option">
                      <input
                        type="checkbox"
                        className="checkbox-option"
                        id={`miCheckbox${index + 1}`}
                      />
                      <span>{Tiendas[index + 1].name}</span>
                    </div>
                  )}
                </div>
              );
            }

            return null;
          })}
        </div>
        {window.innerWidth >= 320 && window.innerWidth <= 468 ? (
          <div className="filter-row">
            <div className="filter-type">
              <span className="filter-subtitle">Tipo de Ropa</span>
              {tRopa}
            </div>
            <div className="filter-type">
              <span className="filter-subtitle">Accesorios</span>
              {tAccesorios}
            </div>
          </div>
        ) : (
          <>
            <div className="filter-type">
              <span className="filter-subtitle">Tipo de Ropa</span>
              {tRopa}
            </div>
            <div className="filter-type">
              <span className="filter-subtitle">Accesorios</span>
              {tAccesorios}
            </div>
          </>
        )}
      </div>
    </>
  );
}

