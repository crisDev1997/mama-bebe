import React,{ createContext, useState } from 'react';
import { Productos } from '../../data/data'; 

export const ProductContext = createContext({
  productos: {},
  setProducts: () => {},
  prodFiltered: {},
  setProdFiltered: () => {},
  filterProducts:()=>{}, //setFilterProducts: (filter) => {}  //setFilterProducts: (filter) => {}  //setFilterProducts: (filter) => {}  //setFilterProducts: (filter) => {}  //setFilterProducts: (filter) => {
});

function ProductProvider ({ children }){
  const testData=Productos || {};
  const [productos, setProducts] = useState(testData);
  const [prodFiltered,setProdFiltered] =useState([]);
  
  const filterProducts = ({ marcas, nombre, }) => {
    
    let filtered = productos;
  
    if (marcas && marcas.length) {
      filtered = filtered.filter(p => marcas.includes(p.brand));
    }
  
    if (nombre) {
      filtered = filtered.filter(p => 
        p.nombre.toLowerCase().includes(nombre.toLowerCase())
      );
    }
   /*  if (type) {
      filtered = filtered.filter(p => p.type === type);
    } */
    setProdFiltered(filtered);
  }

  const productContext={
    productos,
    setProducts,
    prodFiltered,
    filterProducts,
    setProdFiltered
  };
  return (
    <ProductContext.Provider value={productContext}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;