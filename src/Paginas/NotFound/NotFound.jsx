import './NotFound.css';
import imgNotFound from '../../assets/images/page-not-found.jpg';
import { useNavigate } from 'react-router-dom';
export default function NotFound() {
    const navigate=useNavigate()
    const handleBackClick=()=>{
        navigate('/');
    }
  return (
    <div className='page-not-found'>
        
        <div className="container-img">
            <img src={imgNotFound} alt="Pagina no encontrada"  className='img-not-found'/>
        </div>
        <div className="container-data">
            <h2 className='h2-not-found'>ERROR 404: Pagina no disponible!</h2>
            <span className='span-not-found'>La dirección específica dentro de la página que estás intentando encontrar no existe o no se ha creado. </span>
            <button className='btn-not-found' onClick={handleBackClick}>Volver al Inicio</button>
        </div>
    </div>
  )
}
