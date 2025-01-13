import { useEffect } from 'react'
import './ConfirmarAviso.css'
import { useNavigate } from 'react-router-dom'
export const ConfirmarAviso = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    setTimeout(()=>{
      navigate('/')
    },5000)
  },[])
  return (
    <div className='confirmar-cuenta-ventana'>
        <div className='confirmar-title'>Tu Cuenta ha sido Registrada!</div>
        <div className='confirmar-info'>Para finalizar el registro confirme su cuenta en su direccion de correo electronico!</div>
        <div className='confirmar-info'>Recibira un correo electronico con un enlace para confirmar su cuenta.</div>
        <div className='confirmar-info'>En caso de que no reciba el correo en su bandeja de entrada, revise la papelera de span.</div>
    </div>
  )
}
