import { useEffect } from 'react';
import './CambioConfirmado.css';
import { useNavigate} from 'react-router-dom';

const CambioConfirmado = () => {
  const navigate= useNavigate();
  useEffect(()=>{
    setTimeout(()=>{
      navigate('/auth/login');
    },5000)
  },[])
  return (
      <div className='pagina-recuperar-cuenta'>
      <div className="recuperar-container">
        <span className="recuperar-title">Se ha cambiado tu Contraseña!</span>
        <span className='recuperar-desc'>Se ha cambiado la contraseña en tu cuenta, reedirigiendo a la pagina de inicio de sesion...</span> 
        </div>
      </div>
  )
}

export default CambioConfirmado