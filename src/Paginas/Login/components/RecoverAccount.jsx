import {useState} from 'react'
import { InputData } from '../../../components/Inputs/Inputs';
import { useFormik } from 'formik';
import * as Yup from "yup";
import ReCAPTCHA from 'react-google-recaptcha';
import { sendRecoverAccount } from '../../../Auth/graphql/Queries';
import './RecoverAccount.css';
import SendedRecoverMessage from './SendedRecoverMessage';
import { useNavigation } from 'react-router-dom';
export default function RecoverAccount({handleChangeToRecover}) {
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [isSuccess, setIsSuccess]= useState(false);
  const [error, setError] = useState('');
  const submitting = useNavigation().state === 'submitting';
  const formRecover = useFormik({
    initialValues:{
        correoR:"",
    },
    validationSchema: Yup.object({
        correoR: Yup.string()
        .email("Correo invalido")
        .required("Debe introducir el correo con el cual se registro"),
    }),
    onSubmit: async (values)=>{
        setError('');
      if(recaptchaToken?.length===0 || recaptchaToken===null){  
        setError('Debe completar el captcha');
      }else{
        const response = await sendRecoverAccount(values.correoR);
        if(response.success){
          setIsSuccess(true);
        }else{
          setError(response.error);
        }
      }
    }
  })
  return (
    <div className="pagina-login">
         {isSuccess? <SendedRecoverMessage changeToLogin={handleChangeToRecover}/> :
         <>
        <div className="recovery-container">
         <div className="back-pages">
            <a to="/">
              <div className="back-home-page" onClick={handleChangeToRecover}>
                <i className="fa-solid fa-arrow-left"></i>
                <span>Volver</span>
              </div>
            </a>
          </div>
          <h2>Recuperacion de Cuenta</h2>
          <form onSubmit={formRecover.handleSubmit} className='form-email-recover'>
          <span className='span-sub'>Para recuperar su cuenta, por favor ingrese su dirección de correo electrónico con el que se registro y envíe. Se le enviará un mensaje de recuperación a la cuenta de correo electrónico asociada. </span>
          <InputData
           campo='Correo de cuenta:' type='email' placeholder='Correo con el que se registro' inputId='correoR' width='100%' name='correoR'  onChange={formRecover.handleChange} onBlur={formRecover.handleBlur} value={formRecover.values.correoR} touched={formRecover.touched.correoR} errors={formRecover.errors.correoR}
          />
          <ReCAPTCHA sitekey='6LfWkUwpAAAAAAMC8hH3KJjHBYeWcmyzvhegjYYz'
            onChange={(token)=>{setRecaptchaToken(token)}}/>
            {error.length>0 && <div className='error-recovery'>{error}</div>}
          <button type='submit' disabled={submitting ? true: false}>Enviar</button>
          </form>
        </div>
         </>}
      </div>
  )
}
