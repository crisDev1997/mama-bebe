import { useEffect } from 'react';
import './SendedRecoverMessage.css';

const SendedRecoverMessage = ({changeToLogin}) => {
    useEffect(()=>{
        setTimeout(()=>{
          changeToLogin();
        },5000)
      },[])

  return (
    <div className="recovery-message-container">
    <div className="recovery-success">
        <span className='recover-title'>Correo de recuperación de cuenta enviado!</span>
        <span className='recover-info'>Se ha enviado un correo a su correo para recuperar su cuenta.</span>
        <span className='recover-info'>Revise su correo electronico, para verificar un correo para recuperar su cuenta.</span>
        <span className='recover-info'>Si el correo no esta presente en su bandeja de entrada revise la carpeta de spam.</span>
    </div>
    </div>
  )
}

export default SendedRecoverMessage;