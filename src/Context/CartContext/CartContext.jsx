import React,{ createContext, useState } from 'react';

export const CartContext = createContext({
  cartProducts: [],
  reorderCart:()=>{},
  addToCart: () => {},
  setCartProducts: () => {},
  incProductCart: () => {},
  decProductCart: () => {},
  removeCartItem: () => {},
  getTotal: () => {},

});
function reordenarCarro(productos) {
  const resultado = [];
  productos.forEach(producto => {
    const index = resultado.findIndex(p => {
      return p.id === producto.id &&
             p.talla === producto.talla &&
             p.color === producto.color &&  
             p.tamano === producto.tamano;
    });
    
    if(index === -1) {
      resultado.push({
        ...producto  
      })
    } else {
      const cantidadActual = resultado[index].cantidad;
      resultado[index].cantidad = cantidadActual + producto.cantidad;
    }

  });

  return resultado;

}
function CartProvider({children}){ 
  const [cartProducts, setCartProducts] = useState([]);

  const reorderCart = () => {
    const ordenado = reordenarCarro(cartProducts);
    setCartProducts(ordenado);
    return ordenado;
  }

  const addToCart=(_product_)=>{
    let cart=[];
    const productIndex = cartProducts.findIndex(p => {
      return p.id === _product_.id && 
             p.talla === _product_.talla &&
             p.color === _product_.color; 
    });
    if(productIndex !== -1){
    
    const product = cartProducts[productIndex];
    const updatedProduct = {
      ...product,
      cantidad: product.cantidad + _product_.cantidad
    };

    const updatedCart = [...cartProducts];
    updatedCart[productIndex] = updatedProduct;
      const reordenado = reordenarCarro(updatedCart);
      cart=reordenado;
      setCartProducts(reordenado);
    } else {
      _product_.cantidad = _product_.cantidad ?? 1;
      cart=[...cartProducts, _product_];
      setCartProducts([...cartProducts, _product_]);
    }
    return cart;
  }
  
  const incProductCart = (index) => {
    cartProducts[index].cantidad = cartProducts[index].cantidad
      ? cartProducts[index].cantidad + 1
      : 1;
    cartProducts[index].subtotal = cartProducts[index].cantidad * cartProducts[index].precio;
    setCartProducts([...cartProducts]);
  };

  const decProductCart = (index) => {
    if (cartProducts[index].cantidad > 1) {
      cartProducts[index].cantidad = cartProducts[index].cantidad - 1;
      cartProducts[index].subtotal = cartProducts[index].cantidad * cartProducts[index].precio;
      setCartProducts([...cartProducts]);
    }
  };

  const removeCartItem = (_index_) => {
    const newCart = cartProducts.filter((item, index) => index !== _index_);
    setCartProducts(newCart);
  };

  const getTotal = () => {
    return cartProducts.reduce((total, producto) => {
      const precio = producto.oferta ?? producto.precio;
      const cantidad = producto.cantidad ?? 1;
      const subtotal = precio * cantidad;
      return total + subtotal;
    }, 0);
  };



  const cartContext={
    cartProducts,
    reorderCart,
    setCartProducts,
    addToCart,
    incProductCart,
    decProductCart,
    removeCartItem,
    getTotal
  }

  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
