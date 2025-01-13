import './Clientes.css'
import { Clients } from '../../../data/const'

export default function Clientes(){
    return (
    <div className='clientes-satisfechos-seccion'>
   
      <div className="clientes-header">
        <div className="clientes-title">Clientes Satisfechos</div></div>
       <div className='clientes-show'>
            {Clients.map((client,index)=>{
                return <ClienteWidget nombre={Clients[index].nombre} img={Clients[index].img} comment={Clients[index].comment} key={index}/>
            })}
       </div>   
    
    </div>)
}


function ClienteWidget({nombre,img,comment}){
    return(<div className='cliente-reseña'>
        <img src={img} alt={nombre} />
        <div className='cliente-nombre'>{nombre}</div>
        <div className="comentario">
            {comment}
        </div>
    </div>)
}