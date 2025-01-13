import "./Footer.css";
import logo from "../../assets/images/logo-white-nbg.jpg";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-contenido">
        <div className="footer-logo">
          <img src={logo} alt="Logotipo" />
        </div>
        <div className="footer-info">
          <span>Contactenos</span>
          <div className="contact-data">
            <i className="fa-solid fa-envelope icon"></i>{" "}
            {"contacto@tutienda.com"}
          </div>
          <div className="contact-data">
            <i className="fa-brands fa-whatsapp"></i> {"(+591) 456-7890"}
          </div>
          <div className="contact-data">
            <i className="fa-solid fa-phone icon"></i> {"64-52-148"}
          </div>
        </div>
        <div className="footer-social">
          <span>Nuestras Redes</span>
          <div className="enlace">
            <i className="fa-brands fa-tiktok"></i>
            <a href="https://twitter.com/?lang=es">Tik Tok</a>
          </div>
          <div className="enlace">
            <i className="fa-brands fa-square-facebook"></i>
            <a href="https://www.facebook.com">Facebook</a>
          </div>
          <div className="enlace">
            <i className="fa-brands fa-square-instagram"></i>
            <a href="https://www.instagram.com">Instagram</a>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        {`Copyright © 2023 Tienda Mama y Bebé | Powered by Gato Creativo`}
      </div>
    </div>
  );
}
