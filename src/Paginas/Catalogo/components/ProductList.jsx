import React, { useState, useEffect, useRef } from "react";
import "./ProductList.css";
import { useLocation } from "react-router-dom";
import { useProductContext } from "../../../Context/ProductContext/useProductContext";
import { LinkedProductCard } from "../../../components/ProductCard/ProductCard";
import { useNavigate } from "react-router-dom";
import NoResultsImg from "../../../assets/images/no-results.jpg"

const ProductList = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { productos, prodFiltered, filterProducts } = useProductContext();
  const indexedListRef = useRef(indexarListaProductos(productos));
  const [currentIndex, setIndex] = useState(0);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search");
  const [results, setResults] = useState(true);
  const navigate=useNavigate();

  //UseEffect para el fetch
  useEffect(() => {},[])
  //Este useEffect es para las busquedas
  useEffect(() => {
    if (searchQuery !== null) {
      setIsLoading(true);
      filterProducts({ nombre: searchQuery });
      indexedListRef.current = indexarListaProductos(prodFiltered);

      if (prodFiltered.length == 0) {
        setResults(false);
      } else {
        setResults(true);
      }
      
      setIndex(0); 
      setIsLoading(false);
    }
  }, [searchQuery]);

  const renderIndexadores = (indexedList) => {
    const elementos = [];
    for (let i = 0; i < indexedList.length; i++) {
      elementos.push(
        <div
          className={`index-num ${i === currentIndex ? "active" : ""}`}
          key={i + 1}
          onClick={() => {
            setIndex(i);
          }}
        >
          {i + 1}
        </div>
      );
    }
    return elementos;
  };
  
  const reloadPage = () => {
    navigate('/catalogo');
    window.location.reload();
  };

  if(isLoading){
    return(
      <div className="loading-container">
        <span className="span-loading">Cargando Resultados...</span>
      </div>
    )
  }


  if (results == false) {
    return (
      <div className="no-results-container">
        <span className="span-no-results">No hay resultados para su búsqueda: {searchQuery}</span>
        <div className="image-container">
          <img src={NoResultsImg} alt="No Resultados" className="img-no-results" />
          <button className="btn-bluelight btn-reload" onClick={reloadPage}>Recargar Página</button>
        </div>
      </div>
    );
  }
  return (
    <main className="catalogo-productos">
      <section className="seccion">
      <h2 className="product-span-title">Lista de Productos</h2>
        <div className="seccion-productos">
        {indexedListRef.current[currentIndex].map((producto) => {
          return (
            <LinkedProductCard
              key={producto["id"]}
              id={producto["id"]}
              nombre={producto.nombre}
              img={producto.img}
              oferta={producto.oferta}
              precio={producto.precio}
            />
          );
        })}
          
        </div>
      <div className="product-list-index">
        {renderIndexadores(indexedListRef.current)}
      </div>
      </section>
    </main>
  );
};

const indexarListaProductos = (productos) => {
  let pos = -1;
  let lista = [];
  let maxProds = 20;
  for (let index = 0; index < productos.length; index++) {
    if (index % maxProds === 0) {
      pos++;
      lista[pos] = [];
    }
    lista[pos].push(productos[index]);
  }
  return lista;
};

export default ProductList;
