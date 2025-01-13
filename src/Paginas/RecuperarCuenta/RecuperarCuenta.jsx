import * as Yup from 'yup';
import { useState} from 'react'
import CambioConfirmado from './components/CambioConfirmado';
import { useFormik } from 'formik';
import { InputData } from '../../components/Inputs/Inputs';
import { useParams,useNavigation,json} from 'react-router-dom';
import { verifyRecoverToken } from '../../Auth/graphql/Queries';
import './RecuperarCuenta.css'
import { recuperarCuenta } from '../../Auth/graphql/Mutations';

const RecuperarCuentaPage = () => {
  const [isSuccess, setIsSuccess]= useState(false);
  const [errorUI, setErrorUI] = useState('');
  const {uid} = useParams();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const recoverForm = useFormik({
    initialValues: {
      uid: uid,
      pass: '',
      confirmPass: '',
    },
    validationSchema: Yup.object({
      pass: Yup.string().matches(/^(?=.*[A-Z])(?=.*[0-9]).+/,'La contraseña debe contener al menos una mayuscula y un numero').min(8,'Minimo 8 caracteres').required('Rellene este campo'),
      confirmPass: Yup.string().oneOf([Yup.ref('pass'), null], 'Las contraseñas deben ser iguales').required('Rellene con la contraseña ya introducida')
      
    }),
    onSubmit: async (values) => {
      try {
        navigation.state='submitting';
        const response = await recuperarCuenta(uid,values.pass);
        if(!response.success){
          setErrorUI(response.error);
          navigation.state='idle';
        }else{
          setIsSuccess(true)
          navigation.state='idle';
        }
      } catch (error) {
        setErrorUI(error);
        navigation.state='idle';
      }
    }
  })

  return (
    <div className='pagina-recuperar-cuenta'>
      {isSuccess? <CambioConfirmado/>:
       <div className="recuperar-container">
          <span className="recuperar-title">Recuperación de cuenta</span>
          <span className='recuperar-desc'>Para recuperar su cuenta necesita volver a escribir su contraseña, por favor, escriba la contraseña que desea utilizar y luego envie para confirmar el cambio de contraseña y recuperacion de cuenta. </span> 
          <form method='POST' onSubmit={recoverForm.handleSubmit}>
            <InputData campo='Contraseña' type='password' placeholder='Escriba su contraseña' width='100%' name='pass' onChange={recoverForm.handleChange} onBlur={recoverForm.handleBlur} value={recoverForm.values.pass} touched={recoverForm.touched.pass} errors={recoverForm.errors.pass}/>
            <InputData campo='Repita la contraseña' type='password' placeholder='Repetir Contraseña' width='100%' name='confirmPass' onChange={recoverForm.handleChange} onBlur={recoverForm.handleBlur} value={recoverForm.values.confirmPass} touched={recoverForm.touched.confirmPass} errors={recoverForm.errors.confirmPass} />
            {errorUI.length>0? <div className="align-self-center"><span className='error-message'>{errorUI}</span></div>: <></>}
            <div className="align-self-center">
            <button type='submit' className='recuperar-btn btn-bluelight' disabled={isSubmitting ? true: false }>{isSubmitting ? 'Cargando...':'Enviar'}</button>
            
            </div>
          </form>
          </div>}
    </div>
  )
}

export const RecuperarCuentaAction = async ({request}) => {
  try {
    const formData= await request.formData();

    const uid= await formData.get('uid');
    const pass= await formData.get('pass');
    const response = await recuperarCuenta(uid,pass);
    if(!response.success){

      return {message: 'Hubo un error al resetear la contraseña', error: response.error};
    }else{
      return {success:true};
    }
  } catch (error) {
    return {message: 'Error al enviar el formulario!', error: error};
  }
}
export const RecuperarCuentaLoader = async (uid,tokenRecover) => {
  console.log("Ejecutando loader");
 
    const response = await verifyRecoverToken(uid,tokenRecover);
    if(response.success==false){
      
      throw json({message: 'Token de Recuperacion invalido!', error: response.error});
      
    }else{
      return {verified: true, token:response.data.token};
    }
}

export default RecuperarCuentaPage