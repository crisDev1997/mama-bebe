import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./Carrito.css";
import { useCartContext } from "../../Context/CartContext/useCartContext";
import emptyCardImg from "../../assets/images/empty-cart.png";
import { useUserContext } from "../../Context/UserContext/useUserContext";
import { eliminarProductoCarro } from "../../Cart/graphql/Mutations";
export default function Carrito() {
  const { cartProducts, getTotal } = useCartContext();
  const impuesto = Number((getTotal() * 0.03).toFixed(2));
  const total = (getTotal() + impuesto).toFixed(2);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (cartProducts.length > 0) {
    return (
      <div className="pagina-carrito">
        <div className="contain">
          <span className="carrito-title">
            Listado de Productos en Carrito:
          </span>
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartProducts.length > 0 &&
                cartProducts.map((producto, index) => {
                  const precio = producto.oferta ?? producto.precio;
                  const cantidad = producto.cantidad ?? 1;
                  return (
                    <ProductoItem
                      key={index}
                      id={producto.id}
                      nombre={producto.nombre}
                      img={producto.img}
                      precio={precio}
                      cantidad={cantidad}
                      talla={producto.talla}
                      color={producto.color}
                      index={index}
                    />
                  );
                })}
              {cartProducts.length > 0 && (
                <>
                  <tr>
                    <td></td>
                    <td></td>
                    <td className="td-column">
                      <span>Subtotal</span> <span>Impuestos</span>{" "}
                      <span>Total:</span>
                    </td>
                    <td>
                      <div className="td-column">
                        <span>{`${getTotal()} Bs`}</span>{" "}
                        <span>{`${impuesto} Bs`}</span>{" "}
                        <span>{`${total} Bs`}</span>
                      </div>
                    </td>
                    <td></td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
          <div className="check-out">
            <Link to="/comprar-productos">
              {" "}
              <button>Realizar Pago</button>
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="pagina-carrito">
        <div className="empty-contain">
          <img src={emptyCardImg} alt="Carrito Vacio!" />
          <span className="span-title-empty-cart">Tu carrito esta vacio!</span>
          <span className="span-subtitle-empty-cart">
            Agrega productos al carro
          </span>
          <Link to="/catalogo">
            {" "}
            <button>Ir al Catalogo</button>
          </Link>
        </div>
      </div>
    );
  }
}

const ProductoItem = ({
  id,
  index,
  nombre,
  img,
  cantidad,
  precio,
  color,
  talla,
}) => {
  const {
    incProductCart,
    decProductCart,
    removeCartItem,
    cartProducts,
    setCartProducts,
  } = useCartContext();
  const { isAuth, userData } = useUserContext();
  const rowRef = useRef(null);
  const decCantidad = (index) => {
    decProductCart(index);
  };
  const incCantidad = (index) => {
    incProductCart(index);
  };
  const eliminarItem = async () => {
    const oldCart = cartProducts;
    await removeCartItem(index);
    if (isAuth) {
      if (cartProducts.length > 0) {
        const response = await eliminarProductoCarro(userData.uid, index);
        if (!response.success) {
          setCartProducts(oldCart);
        }
      }
    }
  };

  return (
    <tr ref={rowRef}>
      <td>
        <div className="producto-img-name">
          <img src={img} alt="Producto" />
          <div className="product-details">
            <div>
              <span>{nombre}</span>
            </div>
            {color && <div>Color: {color}</div>}
            {talla && <div>Talla: {talla}</div>}
          </div>
        </div>
      </td>
      <td>{precio} Bs.</td>
      <td>
        {" "}
        <div className="quantity">
          <i
            className="fa-solid fa-minus"
            onClick={() => {
              decCantidad(index);
            }}
          ></i>{" "}
          <span> {cantidad}</span>{" "}
          <i
            className="fa-solid fa-plus"
            onClick={() => {
              incCantidad(index);
            }}
          ></i>{" "}
        </div>{" "}
      </td>
      <td>
        <div className="subtotal">
          {precio * cantidad} Bs
          <div className="remove">
            <i className="fa-solid fa-trash" onClick={eliminarItem}></i>
          </div>
        </div>
      </td>
    </tr>
  );
};
