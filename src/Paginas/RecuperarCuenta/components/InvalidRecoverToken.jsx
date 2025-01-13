import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const InvalidRecoverToken = () => {
  const navigate= useNavigate();
  useEffect(()=>{
    setTimeout(()=>{
      navigate('/auth/login');
    }
    ,5000)
  },[])
  return (
    <div className='pagina-recuperar-cuenta'>
      <div className="recuperar-container">
        <span className="recuperar-title">Recuperacion Invalida o Expirada</span>
        <span className='recuperar-desc'>El tiempo para recuperar su cuenta fue expirado, vuelva intentarlo reenviando su correo en la pagina de inicio de sesión</span> 
        </div>
      </div>
    
  )
}

export default InvalidRecoverToken