import {  RouterProvider} from "react-router-dom";
import { Suspense,} from "react";
import "./App.css";
import LoaderPage from "./components/LoaderPage/LoaderPage";
import CartProvider from "./Context/CartContext/CartContext";
import UserProvider from "./Context/UserContext/UserContext";
import { router } from "./routes/routes";

function App() {
  return (
        <CartProvider>
    <UserProvider>
        <Suspense fallback={<LoaderPage/>}>
          <RouterProvider router={router}/>
        </Suspense>
      </UserProvider>
    </CartProvider>
  )
}

export default App;
