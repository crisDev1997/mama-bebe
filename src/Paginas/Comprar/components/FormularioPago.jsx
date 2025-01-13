import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CheckOrSelectData, InputData} from '../../../components/Inputs/Inputs'
import { useCartContext } from '../../../Context/CartContext/useCartContext'
import { ciudades } from '../../../data/const'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import './FormularioPago.css'
export default function FormularioPago() {
  const {cartProducts, getTotal}=useCartContext();  
  const impuesto=Number((getTotal()*0.03).toFixed(2));
  const total=(getTotal() + impuesto).toFixed(2);

  const defaultUserAddress = 'Av 6 de Agosto 464';
  const [direccion, setDireccion] = useState(defaultUserAddress);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  const sendWhatsApp=()=>{
    let message = [
      `Buenas tardes quisiera que me genere un código QR para la adquisicion de estos productos:`,
    ];

    cartProducts.forEach(producto => {
      let productName = `${producto.nombre} ${producto.color ? 'Color: '+producto.color : ''} ${producto.talla ? 'Talla: '+ producto.talla : ''} ${producto.tamano ? 'Tamaño: '+producto.tamano : ''}`;
      message.push(
        `Producto: ${productName} Precio Unidad: ${producto.precio} Bs.  Cantidad: ${producto.cantidad} unidades  Subtotal: ${producto.subtotal} Bs.` 
      );
    });

    message.push(`Costo impuesto: ${impuesto} Bs.`);
    message.push(`Total: ${total} Bs.` );
    message.push(`Carnet/NIT: ${formik.values.ciNit}  Nombre: ${formik.values.nombreFactura}`);
    message.push(`Direccion: ${direccion}`);
    const encodedMessage = message.join('%0A');
    window.open(`https://wa.me/59173440696?text=${encodedMessage}`, '_blank');
  }
  const formik = useFormik({
    initialValues:{
      ciNit:'',
      nombreFactura:'',
    },
    validationSchema: Yup.object({
      ciNit:Yup.string().required('Rellene con un numero para su identificacion'),
      nombreFactura:Yup.string().required('Rellene con un nombre'),

    }),
    onSubmit: values =>{
      if(direccion!==''){
        sendWhatsApp()
      }
    }

  })
  return (
    <div className="formulario-container">
     <div className="column formulario">
     <Link to='/carrito-compras'>
      <div className="back-cart">
        <i className="fa-solid fa-cart-shopping"></i>
          <span>Volver al carro</span>
        </div>
        </Link>
        <form onSubmit={formik.handleSubmit}>
         <div className="form-buy">
          <span className='form-title'>FORMULARIO DE PAGO</span>
          <span className='form-subtitle-invoice'>DATOS PARA FACTURA</span>
          <span className='form-instruction'>Rellene los siguientes campos para la facturacion de sus productos:</span>
          <div className="row-inputs">
            <InputData campo='Carnet/NIT' type='text' width={'50%'} placeholder='Carnet o NIT' inputId='ci' name='ciNit' errors={formik.errors.ciNit} onBlur={formik.handleBlur} onChange={formik.handleChange} touched={formik.touched.ciNit} value={formik.values.ciNit}/>
            <InputData campo='Cliente' type='text' placeholder='Escriba un nombre para la factura' inputId='invoiceName' name='nombreFactura' errors={formik.errors.nombreFactura} onBlur={formik.handleBlur} onChange={formik.handleChange} touched={formik.touched.nombreFactura} value={formik.values.nombreFactura}/>
          </div>
            <span className='form-instruction'>Seleccione y/o introduzca su direccion para su compra</span>
            <CheckOrSelectData titulo='Direccion' defaultOption='Seleccione' options={ciudades} selectId='ciudadId' type='text' defaultUserInfo={defaultUserAddress}  onChange={setDireccion} auxValue={direccion}/>
            <button className='btn-bluelight btn-next' type='submit'>Hacer Pedido por WhatsApp</button>
            </div>
            </form>
     </div>
            <div className="column">
            <span className='form-subtitle-invoice'>PRODUCTOS SELECCIONADOS</span>
      <table>
            <thead>
        <tr>
          <th>Producto</th>
          <th>Precio</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {cartProducts.length>0 && cartProducts.map((producto, index)=>{
          const precio=producto.oferta ?? producto.precio;
          const cantidad=producto.cantidad ?? 1;
          return <FormularioItem key={index} id={producto.id} nombre={producto.nombre} img={producto.img} precio={precio} cantidad={cantidad} talla={producto.talla} color={producto.color}/>
        })}
        {cartProducts.length>0 && (
          <>
          <tr>
            <td></td>
            <td className='td-column'><span>Subtotal</span> <span>Impuestos</span> <span>Total:</span></td>
            <td><div className="td-column">
            <span>{`${getTotal()} Bs`}</span> <span>{`${impuesto} Bs`}</span> <span>{`${total} Bs`}</span>
              </div></td>
            <td></td>
          </tr>
          
          </>
        )}
      </tbody>
            </table>
            </div>
    </div>
  )
}
function FormularioItem({ nombre,color,talla,precio,cantidad}){
  return(<tr>
    <td>
      <div className="">
      <div className="producto">
        <div className="product-details">
        <div>
            <span>{nombre}</span>
            {color && (<div>Color: {color}</div>)}
            {talla && (<div>Talla: {talla}</div>)}
        </div>
        </div>
        <div className="">x {cantidad}</div>
        </div>
      </div>
    </td>
    <td>{precio} Bs.</td>
    <td><div className="subtotal">
    {precio*cantidad} Bs
    </div>
      
      </td>
   
  </tr>)

}