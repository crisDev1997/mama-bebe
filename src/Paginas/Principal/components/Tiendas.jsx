import { Categories } from "../../../data/const";
import './Tiendas.css'

export default function Tiendas() {

  return (
    <div className="categorias">
      <h2>Tiendas</h2>
        <div className="categorias-seccion">
        {Categories.map((categoria, index) => {
      return <Categoria key={index} nombre={categoria.nombre} img={categoria.img} />;
    })}
        </div>
    </div>
  );
}

function Categoria(props) {
  return <div className="categoria-item">
  <img src={props.img} alt={props.nombre} className="categoria-img" />
  <span className="categoria-text">{props.nombre}</span>
</div>;
}


