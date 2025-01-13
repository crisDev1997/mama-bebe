
import React, { useState, useEffect } from 'react';
import logo from "../../assets/images/logo-mama&bebe.jpg";
import Navbar from "./components/Navbar";
import "./Header.css";
import BurgerNav from "./components/BurgerNav";
import { useUserContext } from '../../Context/UserContext/useUserContext'
import AccountDropDown from '../../components/Header/components/AccountDropdown';
import { Link, useNavigate } from 'react-router-dom';
export default function Header() {
  const [bodyWidth, setBodyWidth] = useState(document.body.clientWidth);
  const {userData} = useUserContext();
  
  useEffect(() => {
    const handleResize = () => {
      setBodyWidth(document.body.clientWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      <div className="Header" id="Header" style={{width:`${bodyWidth}px`}}>
        <div className="logo">
          <img src={logo} alt="Logotipo" />
        </div>
       <div className="nav">
       <Navbar/>
        {Object.keys(userData).length > 0 ? <AccountDropDown></AccountDropDown> : <LoginButtons />}
        <div className="burger-nav">
        <BurgerNav/>
        </div>
       </div>
      </div>
    </>
  );
}
function LoginButtons() {
  const navigate = useNavigate();
  return (
    <div className="login-nav-buttons">
      <button className="btn btn-yellow " onClick={()=>{navigate('/auth/login')}}>Iniciar Sesion</button>
      <button className="btn btn-bluelight" onClick={()=>{navigate('/auth/registrarse')}}>Registrarse</button>
      
    </div>
  );
}