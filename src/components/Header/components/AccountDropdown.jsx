import './AccountDropdown.css';
import { useState } from 'react';
import {useUserContext} from '../../../Context/UserContext/useUserContext';
import { useNavigate } from 'react-router-dom';

function AccountDropdown() {
    const [showOptions, setShowOptions] = useState(false);
    const {userData, logout} = useUserContext();
    const {nombres,apellidos} = userData;
    const accountName = `${nombres.split(" ")[0]} ${apellidos.split(" ")[0]}`;
    const navigate = useNavigate();
    const toggleOptions = () => {
      setShowOptions(!showOptions);
    };
    
    return (
      <div className='account-container'>
        <div className="account-dropdown" onClick={toggleOptions}>
     
            <i className="fa-solid fa-user icon"></i>
            <p>{accountName}</p>
            <i
              className={`${
                showOptions
                  ? "fa-solid fa-caret-up icon"
                  : "fa-solid fa-caret-down icon"
              }`}
            ></i> 
          </div>
          <div className={`dropdown-menu ${showOptions ? "active" : "inactive"}`}>
            <ul>
              <AccountOption icon="fa-solid fa-gear icon" name="Cuenta" />
              <AccountOption
                icon="fa-solid fa-info"
                name="Ayuda"
              />
              <AccountOption
                icon="fa-solid fa-dollar-sign"
                name="Compras"
              />
              <AccountOption
                icon="fa-solid fa-right-from-bracket"
                name="Cerrar Sesion"
                onClick={() => {
                  logout();
                  navigate("/auth/login");
                }}
              />
            </ul>
          </div>
       
      </div>
    );
  } 

  function AccountOption({icon,name,onClick}) {
    return (
      <li className="dropdown-option" onClick={onClick}>
        <i className={`${icon}`}></i>
        <a>{name ?? name}</a>
      </li>
    );
  }
  
  export default AccountDropdown;