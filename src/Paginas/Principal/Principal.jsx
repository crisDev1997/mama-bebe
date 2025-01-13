import { useEffect } from "react";
import Search from "../../components/Search/Search";
import SocialButtons from "../../components/SocialButtons/SocialButtons";
import Clientes from "./components/Clientes";
import PPreview from "./components/PPreview";
import Tiendas from "./components/Tiendas";
import { ToastContainer } from "react-toastify";

function Principal() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <div className="pagina-principal">
        <Search align={'center'} enableFilters={false}/>
        <SocialButtons/>
        <Tiendas/>
        <PPreview />
        <Clientes/>
        <ToastContainer />
    </div>
  );
}

export default Principal;
