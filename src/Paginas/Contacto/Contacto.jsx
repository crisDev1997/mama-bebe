import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { InputData } from "../../components/Inputs/Inputs";
import ReCAPTCHA from "react-google-recaptcha";
import ContactUsImg from "../../assets/images/contact-us.jpg";
import { useUserContext } from "../../Context/UserContext/useUserContext";
import { enviarCorreo } from "../../Usuarios/graphql/Mutations";
import "./Contacto.css";
import SuccessModal from "../../components/Modals/SuccessModal";
export default function Contacto() {
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { userData } = useUserContext();
  const [nombre, setNombre]= useState(userData.nombres!=undefined && userData.apellidos!=undefined ? `${userData.nombres.split(" ")[0]} ${userData.apellidos.split(" ")[0]}`: '');
  const dialog = useRef();

  useEffect(()=>{
    window.scrollTo(0, 0);
   
  },[]);

  const [error, setError] = useState("");
  const formik = useFormik({
    initialValues: {
      nombre: nombre,
      correo: userData.correo ?? "",
      mensaje: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("Debe rellenar este campo"),
      correo: Yup.string()
        .email("Este campo debe ser rellenado con correo")
        .required("Debe rellenar este campo"),
      mensaje: Yup.string()
        .min(10, "El mensaje debe tener al menos 10 caracteres")
        .required("Rellene este campo con un mensaje"),
    }),
    onSubmit: async (values) => {
      setError("");
      if (recaptchaToken?.length === 0 || recaptchaToken === null) {
        setError("Debe completar el captcha");
      } else {
        const response = await enviarCorreo(values);
        if (response.success) {
          dialog.current.showModal();
          setIsSuccess(true);
        } else {
          setError(response.error);
        }
      }
    },
  });
  return (
    <>
       {/* <SuccessModal ref={dialog} title={'Mensaje de correo enviado'} description={'Tu mensaje fue enviado a nuestro correo de contacto!'}/> */}
      <div className="pagina-contactos">
      <main className="contact-container">
        <form onSubmit={formik.handleSubmit} className="form-contact">
          <span className="form-contact-span-title">Contacte con Nosotros</span>
          <InputData
            campo="Nombre"
            name="nombre"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.nombre}
            errors={formik.errors.nombre}
            placeholder="Ingrese su nombre"
            width="100%"
            touched={formik.touched.nombre}
          />
          <InputData
            campo="Correo"
            name="correo"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            value={formik.values.correo}
            errors={formik.errors.correo}
            placeholder="Ingrese su correo"
            width="100%"
            touched={formik.touched.correo}
          />
          <span className="span-subtitle">Consulta:</span>
          <textarea
            className="form-message"
            id=""
            cols="30"
            rows="15"
            name="mensaje"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.mensaje}
          ></textarea>
          {formik.touched.mensaje && formik.errors.mensaje ? (
            <span className="message-error">{formik.errors.mensaje}</span>
          ) : (
            <></>
          )}
          <ReCAPTCHA
            sitekey="6LfWkUwpAAAAAAMC8hH3KJjHBYeWcmyzvhegjYYz"
            onChange={(token) => {
              setRecaptchaToken(token);
            }}
          />
          <div style={{ alignSelf: "center", padding:"10px 10px" }}>
            {error && <span className="message-error">{error}</span>}
          </div>
          <button type="submit" className="btn-submit" style={{marginTop:'10px'}}>
            Enviar
          </button>
        </form>
        <div className="info-contact">
            <span>Correo: bellosura@gmail.com</span>
            <span>Telefono: (591) 79845132</span>
          </div>
          </main>
        </div>
 

    </>
  );
}
