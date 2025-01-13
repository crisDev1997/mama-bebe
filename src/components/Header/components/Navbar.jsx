import { useState } from "react";
import { Link } from "react-router-dom";
import ProductCartNav from "./ProductCartNav";

import './Navbar.css';

import "./styles.css";
const routes = [
  {
    path: "/",
    name: "Inicio",
  },
  {
    path: "/catalogo",
    name: "Catalogo",
  },
/*   {
    path: "/ofertas",
    name: "Ofertas",
  }, */
  {
    path: "/puntos-venta",
    name: "Puntos de Venta",
  },
  {
    path: "/contacto",
    name: "Contacto",
  },
];
export default function Navbar() {
 
  return (
    <div className="navbar">
      <div className="nav-options">
        {routes.map((route) => {
          return (
            <NavOption key={route.name} name={route.name} path={route.path} />
          );
        })}
      </div>
      <>
      
      </>
      <div className="cart-nav">
        <ProductCartNav/>
      </div>
    </div>
  );
}
function NavOption({ name, path }) {
  return (
    <Link to={path}>
    <div className="nav-option">
     {name}
    </div>
    </Link>
  );
}







