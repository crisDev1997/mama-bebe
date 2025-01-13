import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputLogin } from "../../components/Inputs/Inputs";
import { useUserContext } from "../../Context/UserContext/useUserContext";
import { useCartContext } from "../../Context/CartContext/useCartContext";
import RecoverAccount from "./components/RecoverAccount";
import { iniciarSesion } from "../../Auth/graphql/Mutations";
import { saveLocalCart } from "../../Cart/cart.local";
import logo from "../../assets/images/logo-mama&bebe.jpg";
import "./Login.css";

const Login = () => {
  const {setUserData, setToken, isAuth , setIsAuth} = useUserContext();
  const { setCartProducts } = useCartContext();
  const [recoverAccount, changeToRecover] = useState(false);
  const navigate = useNavigate();
 
  const handleChangeToRecover = () => {
    changeToRecover(!recoverAccount);
  };
  const [error, setError] = useState(false);
  const formik = useFormik({
    initialValues: {
      correo: "",
      pass: "",
    },
    validationSchema: Yup.object({
      correo: Yup.string()
        .email("Correo invalido")
        .required("Debe introducir su correo"),
      pass: Yup.string().required("Introduzca su contraseña"),
    }),
    onSubmit: async (values) => {
      setError('');
      const res = await iniciarSesion(values.correo, values.pass);
      if (res.success) {
        setError('');
        setUserData(res.data.usuario);
        setToken(res.data.token);
        setIsAuth(true);
        if (res.data.usuario.carro) {
          await setCartProducts(res.data.usuario.carro);
          saveLocalCart(res.data.usuario.carro);
        }
        await localStorage.setItem("rols", JSON.stringify(res.data.token));
        navigate("/");
      } else {
        setError(res.error);
      }
    },
  });
  if(isAuth){
    return <Navigate to="/" />
  }
  if (recoverAccount === true) {
    return (
     <RecoverAccount handleChangeToRecover={handleChangeToRecover}/>
    );
  }
  return (
    <div className="pagina-login">
      <div className="login-container">
        <div className="back-pages">
          <Link to="/">
            <div className="back-home-page">
              <i className="fa-solid fa-home"></i>
              <span>Menu Principal</span>
            </div>
          </Link>
          <Link to="/auth/registrarse">
            <div className="back-register-form">
              <span>Crearse Cuenta</span>
            </div>
          </Link>
        </div>
        <img src={logo} alt="Logo" />
        <div className="form-title login-title">Iniciar Sesion</div>
        <form onSubmit={formik.handleSubmit}>
          <InputLogin
            inputId="email"
            placeholder="Correo"
            type="email"
            icon="fa-solid fa-user"
            width="100%"
            name="correo"
            formik={formik}
          />
          <InputLogin
            inputId="pass"
            placeholder="Contraseña"
            type="password"
            icon="fa-solid fa-lock"
            width="100%"
            name="pass"
            formik={formik}
            isPassword={true}
          />
          <div className="column">
            <a onClick={handleChangeToRecover}>Olvidaste la contraseña?</a>
            {error && (
              <div className="message-error">
                {error}
              </div>
            )}
            <button type="submit">Iniciar Sesion</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
