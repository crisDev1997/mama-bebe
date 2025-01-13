
import { useEffect, useState } from 'react';
import { Link,useNavigate ,Navigate} from 'react-router-dom';
import { InputData, SelectData } from '../../components/Inputs/Inputs';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ciudades } from '../../data/const';
import {useUserContext} from '../../Context/UserContext/useUserContext';
import { ConfirmarAviso } from './components/ConfirmarAviso';
import { useCartContext } from '../../Context/CartContext/useCartContext';
import { registrarse } from '../../Auth/graphql/Mutations';
import { guardarCarro } from '../../Cart/graphql/Mutations';
import ReCAPTCHA from "react-google-recaptcha";
import './Registro.css';


const Registro = () => {

  const {setUserData,setToken, isAuth, setIsAuth} = useUserContext();
  const {cartProducts} = useCartContext();
  const [isSuccess, setIsSuccess]= useState(false);
  const [error, setError] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState('');
 

  const registerForm = useFormik({
    initialValues:{
      nombres:'',
      apellidos:'',
      correo:'',
      telefono:'',
      ciudad:'',
      direccion:'',
      pass:'',
      confirmPass:'',
    },
    validationSchema: Yup.object({
      nombres: Yup.string()
        .min(5, 'Debe tener al menos 5 caracteres')
        .required('Rellene este campo'),

      apellidos: Yup.string()
        .min(5, 'Debe tener al menos 5 caracteres')
        .required('Rellene este campo'),
      correo: Yup.string().email('Correo invalido').required('Rellene este campo'),
      telefono: Yup.string().max(8,'El numero de celular tiene 8 digitos como maximo').matches(/^([67]\d{7})$/, 'Introduzca un telefono valido Ej: 751*****').required('Rellene este campo'),
      ciudad:Yup.string().required('Rellene este campo'),
      direccion:Yup.string().min(10, 'Ej: Av 6 de Agosto N°2464 Edificio Los Jardines, Planta Baja').required('Rellene este campo'),
      pass: Yup.string().matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/,'La contraseña debe tener al menos 8 caracteres, una mayuscula y un numero').required('Rellene este campo'),
      confirmPass: Yup.string().oneOf([Yup.ref('pass'), null], 'Las contraseñas deben ser iguales').required('Rellene con la contraseña ya introducida')
    }),
    onSubmit: async (values) => {
      setError('');
      if(recaptchaToken.length === 0){
        setError('Debe completar el captcha');
        return;
      }
      const res= await registrarse(values);
      if(res.success){
        setError(false);
        await setUserData(res.data.usuario);
        await setToken(res.data.token);
        await setIsAuth(true);
        if(cartProducts.length>0){
          await guardarCarro(res.data.usuario.uid,cartProducts);
        }
        setIsSuccess(true)
      }else if(res.status===409){
        setError('El correo ya fue registrado en otra cuenta');
      }else{
        setError('Error en el servidor');
      }
    }
    },
  );

  const handleChangeRecaptcha=(recaptchaToken)=>{
    setRecaptchaToken(recaptchaToken);
  }
  if(isAuth){
    return <Navigate to="/" />
  }

  return (
    <div className='pagina-registro'>
      <div className="registro-container">
      {isSuccess ? <ConfirmarAviso/> : (
        <>
         <div className="back-pages">
      <Link to='/'><div className="back-home-page">
          <i className="fa-solid fa-home"></i>
          <span >Menu Principal</span>
        </div></Link>
        <Link to='/auth/login'>
        <div className="back-login">
          <span >Tengo Cuenta, Iniciar Sesion</span>
        </div>
        </Link>
      </div>
          <div className='form-register'>
          <span className='form-title'>Crearse una cuenta</span>
          <span className='form-subtitle'>Compra productos para tu bebe desde tu cuenta!</span>
         <form onSubmit={registerForm.handleSubmit} >
          <div className="row-inputs-register">
            <InputData campo='Nombres' type='text' placeholder='Escriba sus nombres' inputId='nombres'  name='nombres'  onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} value={registerForm.values.nombres} touched={registerForm.touched.nombres} errors={registerForm.errors.nombres}/>
            <InputData campo='Apellidos' type='text' placeholder='Escriba sus apellidos' inputId='apellidos'  name='apellidos'  onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} value={registerForm.values.apellidos} touched={registerForm.touched.apellidos} errors={registerForm.errors.apellidos}/>
          </div>
          <InputData campo='Correo' type='email' placeholder='Escriba su correo' inputId='correo' width='100%' name='correo'  onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} value={registerForm.values.correo} touched={registerForm.touched.correo} errors={registerForm.errors.correo}/>
          <InputData campo='Telefono' type='text' placeholder='Numero de Celular' inputId='telefono' width='100%' name='telefono' onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} value={registerForm.values.telefono} touched={registerForm.touched.telefono} errors={registerForm.errors.telefono}/>
     {    <div className="row-inputs-address">
           
            <SelectData titulo='Ciudad' name='ciudad'  options={ciudades} defaultOption='Seleccione' value={registerForm.values.ciudad}  onChange={registerForm.handleChange} onBlur={registerForm.handleBlur}  touched={registerForm.touched.ciudad} errors={registerForm.errors.ciudad}/>
            <InputData campo='Dirección' type='select' placeholder='Direccion' name='direccion' onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} value={registerForm.values.direccion} touched={registerForm.touched.direccion} errors={registerForm.errors.direccion}/>
         </div>}
          <InputData campo='Introduzca una contraseña' type='password' placeholder='Contraseña' inputId='pass' width='100%' name='pass'  onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} value={registerForm.values.pass} isPassword={true} touched={registerForm.touched.pass} errors={registerForm.errors.pass}/>
          <InputData campo='Repita la contraseña' type='password' placeholder='Repetir Contraseña' inputId='confirmPass' width='100%' name='confirmPass'  onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} value={registerForm.values.confirmPass} isPassword={true} touched={registerForm.touched.confirmPass} errors={registerForm.errors.confirmPass}/>
          
          <ReCAPTCHA
            sitekey='6LfWkUwpAAAAAAMC8hH3KJjHBYeWcmyzvhegjYYz'
            onChange={handleChangeRecaptcha}
            
          />
          {error.length>0 && <div className='error-registro'>{error}</div>}
          <button type='submit' className='btn-register'  >Registrarse</button>
         </form>
      </div>
        </>
      )}
      </div>
    </div>
  )
}
export default Registro;



