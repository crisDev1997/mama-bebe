import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../../Context/CartContext/useCartContext";
import { toast } from 'react-toastify';
import {guardarCarro} from '../../Cart/graphql/Mutations';
import {useUserContext} from '../../Context/UserContext/useUserContext';
import {saveLocalCart} from '../../Cart/cart.local';
import 'react-toastify/dist/ReactToastify.css';
import "./ProductCard.css";

export function ProductoCard({ id,nombre, img, precio, oferta }) {
  const {addToCart,reorderCart,setCartProducts}=useCartContext();
  const {isAuth,userData} = useUserContext()
  const product={
    id,
    nombre,
    img,
    precio:oferta ? oferta : precio,
    cantidad:1,
    subtotal: oferta? oferta*1: precio*1
  };
const nombreUpper = nombre.toUpperCase();
  return (
    <div className="product-card">
      <img className="product-image" src={img} alt={nombre} />
      <div className="linea-division"></div>
      <div className="product-card-info">
        <span>{nombreUpper}</span>
        <div className="precios">
          {oferta != undefined ? (
            <>
              {" "}
              <p
                style={{ textDecorationLine: "line-through" }}
              >{`${precio} Bs.`}</p>
              <p>{`${oferta} Bs.`}</p>
            </>
          ) : (
            <p>{`${precio} Bs.`}</p>
          )}
        </div>
        <div className="contain-btn">
          <button className="producto-btn" onClick={async ()=>{
              if(isAuth){
                const oldCart = reorderCart();
                const newCart=addToCart(product);
                const response = await guardarCarro(userData.uid,newCart)
                if(response.success){
                  const cartLocal=addToCart(product);
                  saveLocalCart(cartLocal);
                  await notifyShow();
                }else{
                  setCartProducts(oldCart);
                  errorNotify();
                }
              }else{
                const cartLocal=addToCart(product);
                saveLocalCart(cartLocal);
                await notifyShow();
              }
          }}>Añadir</button>

        </div>
      </div>
    </div>
  );
}

export function LinkedProductCard({ id, nombre, img, precio, oferta }) {
  const {addToCart, reorderCart, setCartProducts}=useCartContext();
  const {isAuth,userData} = useUserContext()
  const navigate=useNavigate();
  const product={
    id,
    nombre,
    img,
    precio: oferta? oferta: precio,
    cantidad:1,
    subtotal: oferta? oferta*1 : precio*1,
  };
  return (
    <>
      <div className="linked-product-card" >
        <img className="linked-product-image" src={img} alt={nombre} onClick={()=>{navigate(`/catalogo/productos/${id}`)}}/>
        <div className="linea-division"></div>
        <div className="linked-product-card-info">  
        <Link to={`/catalogo/productos/${id}`}>
          <span>{nombre}</span>
          </Link>
          <div className="precios">
            {oferta != undefined ? (
              <>
                {" "}
                <p
                  style={{ textDecorationLine: "line-through" }}
                >{`${precio} Bs.`}</p>
                <p>{`${oferta} Bs.`}</p>
              </>
            ) : (
              <p>{`${precio} Bs.`}</p>
            )}
          </div>
          <div className="contain-buttons">
            <button className="btn-yellow ver-producto-btn"><Link to={`/catalogo/productos/${id}`}>Ver Producto</Link></button>
            <button className="btn-bluelight agregar-producto-btn" onClick={async ()=>{
              if(isAuth){
                const oldCart = reorderCart();
                const newCart=addToCart(product);
                console.log(newCart);
                const response = await guardarCarro(userData.uid,newCart)
                if(response.success){
                  const cartLocal=addToCart(product);
                  saveLocalCart(cartLocal);
                  await notifyShow();
                }else{
                  setCartProducts(oldCart);
                  errorNotify();
                }
              }else{
                const cartLocal=addToCart(product);
                saveLocalCart(cartLocal);
                await notifyShow();
              }
            }}>Añadir</button>
          </div>
        </div>
      </div>
    </>
  );
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
