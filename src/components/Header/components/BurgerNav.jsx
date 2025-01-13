import { Link } from "react-router-dom";
import React, { useState } from "react";
import ProductCartNav from "./ProductCartNav";
import { useUserContext } from "../../../Context/UserContext/useUserContext";
import { useNavigate } from "react-router-dom";
import './BurgerNav.css'
const BurgerNav = () => {
  const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
  const [menu_class, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const { userData, logout } = useUserContext();
  const { nombres, apellidos, correo } = Object.keys(userData).length > 0 ? userData : { nombres: '', apellidos: '', correo: '' };
  const accountName = `${nombres.split(" ")[0]} ${apellidos.split(" ")[0]}`;
  const navigate = useNavigate();
  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass("burger-bar clicked");
      setMenuClass("menu visible");
    } else {
      setBurgerClass("burger-bar unclicked");
      setMenuClass("menu hidden");
    }
    setIsMenuClicked(!isMenuClicked);
  };
  return (
    <>
      <nav>
        <div className="burger-menu" onClick={updateMenu}>
          <div className={burger_class}></div>
          <div className={burger_class}></div>
          <div className={burger_class}></div>
        </div>
      </nav>
      <div className={menu_class}>

        { Object.keys(userData).length > 0 ? ( <div className="account-data">
          <div className="account-info">
            <i className="fa-solid fa-user"></i>
            <span>{accountName}</span>
          </div>
          <div className="account-info">
            <span>{correo}</span>
          </div>
        </div> ) :
            (  <div className="login-buttons">
            <Link to='/auth/login'><button className="btn-bluelight">Iniciar Sesion</button></Link>
            <Link to='/auth/registrarse'><button className="btn-yellow">Registrarse</button></Link>
            </div>)
        }
         <div className="line-border"></div>
        <div className="nav-items">
         <Link to='/carrito-compras' onClick={updateMenu}>
          <div className="nav-item">
              <ProductCartNav/>
              <span>Carro</span>
            </div>
         </Link>
          <Link to='/' onClick={updateMenu}>
          <div className="nav-item">
            <i className="fa-solid fa-house"></i>
            <span>Inicio</span>
          </div>
          </Link>
         <Link to="/catalogo" onClick={updateMenu}>
         <div className="nav-item">
            <i className="fa-solid fa-shirt"></i>
            <span>Catalogo</span>
          </div>
         </Link>
          {/* <Link to="/ofertas" onClick={updateMenu}>
          <div className="nav-item">
            <i className="fa-solid fa-dollar-sign"></i>
            <span>Ofertas</span>
          </div>
          </Link> */}
          <Link to="/puntos-venta" onClick={updateMenu}>
          <div className="nav-item">
            <i className="fa-solid fa-location-dot"></i>
            <span>Puntos de Venta</span>
          </div>
          </Link>
          <Link to="/contacto" onClick={updateMenu}>
          <div className="nav-item">
            <i className="fa-regular fa-address-book"></i>
            <span>Contacto</span>
          </div>
          </Link>
        </div>
        { Object.keys(userData).length > 0 ? (
          <>
        <div className="line-border"></div>
        <div className="nav-items">
          <div className="nav-item">
            <i className="fa-solid fa-dollar-sign"></i>
            <span>Mis Compras</span>
          </div>
          <div className="nav-item">
            <i className="fa-solid fa-gear"></i>
            <span>Mi Cuenta</span>
          </div>
          <div className="nav-item">
            <i className="fa-solid fa-info"></i>
            <span>Ayuda</span>
          </div>
          <div className="nav-item" onClick={()=>{
            logout();
            navigate("/auth/login");
          }}>
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Cerrar Sesión</span>
          </div>
        </div>
          </>
        ) :<></>}
      </div>
    </>
  );
};

export default BurgerNav;
