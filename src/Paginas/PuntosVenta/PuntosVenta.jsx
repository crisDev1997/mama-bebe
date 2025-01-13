import { useEffect } from 'react'
import imgNoImg from '../../assets/images/no-image.png'
import './PuntosVenta.css'
import { PuntosVentaData } from '../../data/data'
import Footer from '../../components/Footer/Footer'
export default function PuntosVenta(){
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
    return (
        <main className="pagina-puntos-venta">
            <h2>Puntos de Venta</h2>
            <section className="puntos">
                {PuntosVentaData.map((puntoV)=><PuntoVenta key={puntoV.nombre}  nombre={puntoV.nombre} img={puntoV.img} location={puntoV.location} direccion={puntoV.direccion} descDireccion={puntoV.desc}/>)}
            </section>
        </main>
    )
}
function PuntoVenta({ nombre, img, location, direccion, descDireccion }) {
    return (
      <div className='punto-v-container'>
        <div className="image-container">
          <img src={img} alt={imgNoImg} className='punto-img' />
          <span className="store-name">{nombre}</span>
        </div>
        <div className="row-map-description">
         {location}
          <div className="punto-v-description">
            {nombre != undefined && <span className='punto-v-span-title'>Tienda: {nombre}</span>}
            {direccion != undefined && <span className='punto-v-span-description'>Direccion: {direccion}</span>}
            {descDireccion != undefined && <span className='punto-v-span-description'>{descDireccion}</span>}
          </div>
        </div>
      </div>
    );
  }