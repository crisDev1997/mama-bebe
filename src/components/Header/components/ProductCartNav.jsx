import { useState } from 'react';
import './ProductCartNav.css'
import {useCartContext} from '../../../Context/CartContext/useCartContext'
import { Link } from 'react-router-dom';
const ProductCartNav = () => {
  const {cartProducts, setCartProducts}=useCartContext();

  const [showCart, setShowCart]= useState(false);
  const toggleCart = () => {
    setShowCart(!showCart);
  };
  return (
    <Link to='/carrito-compras'>
      <div className="cart-container-nav" onClick={toggleCart}>
      <div className="cart-icon">
        <i className="fa-solid fa-cart-shopping"/>
      </div>
      <div className="cart-counter">{cartProducts.length}</div>
     
    </div>
    </Link>
  )
}
//{/*  {showCart && <div className={`preview-cart`}>
//        <div className="">21312123</div>
//      </div>} */}
export default ProductCartNav