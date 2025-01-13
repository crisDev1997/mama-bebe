import React from 'react'
import { useState , useEffect} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';


const ConfirmCuenta = () => {

  const [verified,setVerified] = useState(false);
  const location = useLocation();
  const tokenConfirm = new URLSearchParams(location.search).get('confirm-account');
  const navigate = useNavigate();

  useEffect(()=>{
    

  },[tokenConfirm])


  return (
    <div className='confirm-cuenta-container'>
        <p>

        </p>
    </div>
  )
}

export default ConfirmCuenta;
