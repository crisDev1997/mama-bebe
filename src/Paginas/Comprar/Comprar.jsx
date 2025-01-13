import { useState } from 'react'
import './Comprar.css'
import FormularioPago from './components/FormularioPago';

export default function Comprar() {
  const [stepPay, skipStepPay]= useState(1);
  

  const handleBackStep=(currentStep)=>{
    if(currentStep==1) return;
    skipStepPay(currentStep-1);
  }
  return (
    <div className='pagina-comprar'>
       {stepPay===1 &&( <FormularioPago step={1}  onBack={handleBackStep}/>)}
    </div>
  )
}
