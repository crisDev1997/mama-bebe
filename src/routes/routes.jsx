import { lazy} from "react";
import { createBrowserRouter} from "react-router-dom";

import { Layout } from "../components/Layout/Layout";
import { ProtectedRoutes } from "./ProtectedRoutes";
import ProductProvider from "../Context/ProductContext/ProductContext";
import { RecuperarCuentaLoader, RecuperarCuentaAction  } from "../Paginas/RecuperarCuenta/RecuperarCuenta";
import InvalidRecoverToken from "../Paginas/RecuperarCuenta/components/InvalidRecoverToken";
import LoaderPage from "../components/LoaderPage/LoaderPage";

const Principal = lazy(
  async () => await import("../Paginas/Principal/Principal")
);
const Catalogo = lazy(async () => await import("../Paginas/Catalogo/Catalogo"));
const Ofertas = lazy(async () => await import("../Paginas/Ofertas/Ofertas"));
const PuntosVenta = lazy(
  async () => await import("../Paginas/PuntosVenta/PuntosVenta")
);
const Contacto = lazy(async () => await import("../Paginas/Contacto/Contacto"));
const Login = lazy(async () => await import("../Paginas/Login/Login"));
const Registro = lazy(async () => await import("../Paginas/Registro/Registro"));
const ProductoDetalle = lazy(
  async () => await import("../Paginas/ProductoDetalle/ProductoDetalle")
);

const Carrito = lazy(
  async ()=> await import ("../Paginas/Carrito/Carrito")
);
const Comprar = lazy(
  async()=> await import ('../Paginas/Comprar/Comprar')
)

const NotFound = lazy(
  async()=> await import ('../Paginas/NotFound/NotFound')
)
const Compras = lazy(
  async()=> await import ('../Paginas/Compras/Compras'
))
const RecuperarCuenta = lazy(
  async()=> await import ('../Paginas/RecuperarCuenta/RecuperarCuenta'))

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path:"/",
           element:<ProductProvider><Principal /></ProductProvider>
        },
        {
          path: "/carrito-compras",
          element: <Carrito />
        },
        {
          path:"/catalogo",
          element: <ProductProvider><Catalogo /></ProductProvider>
        },
        {
          path: "/catalogo/productos/:id",
          element: <ProductProvider><ProductoDetalle /></ProductProvider>
        },
        {
          path: "/ofertas",
          element: <Ofertas/>
        },
        {
          path: "/puntos-venta",
          element: <PuntosVenta/>
        },
        {
          path: "/contacto",
          
          element: <Contacto/>
        },
        {
          path:"*",
          element: <NotFound/>
        }
      ]
    },
    {
      path: "/",
      element: <ProtectedRoutes/>,
      children:[
        {
          path: "/comprar-productos",
          element: <Comprar/>
        },
        {
          path: "/usuario/compras",
          element: <Compras/>
        }
      ]
    },
    {
      path: "/auth/login",
      element: <Login/>
    },
    {
      path: "/auth/registrarse",
      element: <Registro/>
    },
    {
      path: "/auth/:uid/recovery-account/:tokenRecover",
      element: <RecuperarCuenta/>,
      errorElement: <InvalidRecoverToken/>,
      loader: async ({ params }) => {
        const { tokenRecover, uid } = params;
        return await RecuperarCuentaLoader(uid,tokenRecover)}
    }
  ]

  )