import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./PPreview.css";
import {ProductoCard} from "../../../components/ProductCard/ProductCard";
import { ProductTypes } from "../../../data/const";
import { carouselResponsive } from "../../../data/const";
export default function PPreview() {
  const [productTypeNumber, setProductTypeNumber] = useState(0);
 
  useEffect(() => {

  }, [productTypeNumber]);
  return (
    <div className="preview">
      <div className="preview-header">
        <div className="preview-title">Productos Populares</div>
        <div className="preview-header-s2">
          <div className="preview-types">
            {ProductTypes.map((productos, index) => {
              return (
                <div
                  className={`product-type ${
                    productTypeNumber == index ? "active" : "inactive"
                  }`}
                  onClick={() => {
                    setProductTypeNumber(index);
                  }}
                  key={index}
                >
                  {productos.tipo}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="preview-contenido">
        <Carousel
          responsive={carouselResponsive}
          autoPlay={true}
          autoPlaySpeed={2000}
          shouldResetAutoplay={true}
        >
          {ProductTypes[productTypeNumber].items.map((producto, index) => {
            return (
              <ProductoCard 
                id={producto.id}
                img={producto.img}
                nombre={producto.nombre}
                precio={producto.precio}
                oferta={producto.oferta}
                key={index}
              />
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}



