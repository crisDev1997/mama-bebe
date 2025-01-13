import { useParams } from "react-router-dom";
import { useEffect ,useState} from "react";
import { useProductContext } from "../../Context/ProductContext/useProductContext";
import { useUserContext } from "../../Context/UserContext/useUserContext";
import { useCartContext } from "../../Context/CartContext/useCartContext";
import { guardarCarro } from "../../Cart/graphql/Mutations";
import { saveLocalCart } from "../../Cart/cart.local";
import './ProductoDetalle.css'
import SelectColor from "./components/SelectColor";
import Tallas from "./components/Tallas";
import { ToastContainer,toast } from "react-toastify";


const ProductoDetalle = () => {
  
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const {addToCart,reorderCart,setCartProducts}=useCartContext();
  const {isAuth,userData} = useUserContext()
  const {productos} = useProductContext();  

  const id = useParams().id;
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad]=useState(1);
  const [color, setColor]=useState(null);
  const [talla,setTalla]= useState(null);

  const colors = [
    { id: 1, value: 'rojo', name: 'Rojo' },
    { id: 2, value: 'verde', name: 'Verde' },
    { id: 3, value: 'azul', name: 'Azul' },
    { id: 4, value: 'blanco', name: 'Blanco' },
    { id: 5, value: 'amarillo', name: 'Amarillo' },

  ];
  const tallas=['XS','S','M','L','XL'];

  const handleColorSelect = (color) => {
    setColor(color);
  };
  const handleTallaSelect = (talla)=>{
    setTalla(talla);
  }
  useEffect(() => {
    //Hacer el fetch del producto en vez de usar los productos harcodeados:
    const prod = productos.filter(p => p.id === id)[0];
    
    setProducto(prod);

  }, [productos,id]);

  
  return (
    
    <div className="pagina-producto-detalle">
       {producto && (
         <div className="articulo">
            <img src={producto.img} alt={producto.nombre} />
            <div className="line"></div>
            <div className="info">
              <span className="nombre">{producto.nombre.toUpperCase()}</span>
              <div className="articulo-precios">
              <span className="precio" style={{textDecoration: producto.oferta ? 'line-through' : 'none'}}>{producto.precio} Bs.</span>
              {producto.oferta && (<span className="oferta">{producto.oferta} Bs.</span>)}
              </div>
              <div className="articulo-desc">
                <span className="title">Descripcion</span>
                <span className="descripcion">{producto.desc}</span>
              </div>
              <div className="articulo-detalles">
                <span className="title">Detalles</span>
                {producto.marca && (<span className="marca">Marca: {producto.marca}</span>)}
                {producto.precio && (<span className="detalle-precio">Precio: {producto.oferta ? producto.oferta : producto.precio} Bs.</span>)}
                {producto.para && (<span className="para">Articulo para: {producto.para} </span>)}
                <SelectColor colors={colors}/>
                <Tallas tallas={tallas} onTallaSelect={handleTallaSelect}/>
              </div>
              <div className="set-cantidad">
                <i className="fa-solid fa-minus"onClick={()=>{
                  if(cantidad==1) return
                  setCantidad(cantidad-1)
                }}></i>
                <div className="cantidad" >{cantidad}</div>
                <i className="fa-solid fa-plus" onClick={()=>{setCantidad(cantidad+1)}}></i>
              </div>
              <div className="contain-buttons2">
                <button className="btn-bluelight" onClick={async ()=>{
                  if(color!=null){
                    producto.color = color;
                  }
                  if(talla !=null){
                    producto.talla = talla;
                  }
                  producto.precio = producto.oferta? producto.oferta : producto.precio;
                  producto.cantidad = cantidad;
                  producto.subtotal = producto.precio * producto.cantidad;  
                  const precio = producto.oferta ? producto.oferta : producto.precio;
                  const newProducto= {
                    id: producto.id, 
                    nombre: producto.nombre, 
                    img:producto.img, 
                    precio, 
                    cantidad: cantidad, 
                    subtotal: precio * producto.cantidad,
                    color: color ?? null,
                    talla: talla ?? null}

                  if(isAuth){
                    const oldCart = reorderCart();
                    const newCart=addToCart(newProducto);
                    const response = await guardarCarro(userData.uid,newCart)
                    if(response.success){
                      const cartLocal=addToCart(newProducto);
                      saveLocalCart(cartLocal);
                      await notifyShow();
                    }else{
                      setCartProducts(oldCart);
                      errorNotify();
                    }
                  }else{
                    const cartLocal=addToCart(newProducto);
                    saveLocalCart(cartLocal);
                    await notifyShow();
                  }
                }}>Añadir al Carro</button>
              </div>
            </div>
         </div>
       )}
      <ToastContainer />
    </div>
  )

}
const notifyShow = async ()=>{
  toast.success("Producto Agregado",
  {
    position:"bottom-center",
    autoClose:1000,
    hideProgressBar:false,
    closeOnClick:true,
    pauseOnHover:true,
    draggable:false,
    progress:undefined
  });
}
const errorNotify = async ()=>{
  toast.error("Hubo un error al agregar",
  {
    position:"bottom-center",
    autoClose:1000,
    hideProgressBar:false,
    closeOnClick:true,
    pauseOnHover:true,
    draggable:false,
    progress:undefined
  });
}

export default ProductoDetalle;
