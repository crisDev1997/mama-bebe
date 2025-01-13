import Search from "../../components/Search/Search";
import ProductList from "./components/ProductList";
import Footer from "../../components/Footer/Footer"
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "./Catalogo.css";
export default function Catalogo(){
    useEffect(() => {
        window.scrollTo(0, 0);
      }, [])
    return (
    <div className="pagina-catalogo">
       <Search align='center' enableFilters={true}/>
       
       <ProductList/>
       <ToastContainer/>

    
    </div>)
}