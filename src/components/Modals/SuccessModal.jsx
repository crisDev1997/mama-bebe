import React from 'react'
import { forwardRef } from 'react'
import './Modals.styles.css'
const  SuccessModal = forwardRef(function SuccessModal({ title, description},ref){
    return (
      <dialog className='success-modal' ref={ref} style={{padding:0, border:'none'}} >
          <div className="header-success-modal"><h2>{title}</h2></div>
          <div className="body-success-modal">
          <p>{description}</p>
          <form method="dialog">
              <div style={{alignSelf:'center'}}><button className='btn-success'>Aceptar</button></div>
          </form>
          </div>
      </dialog>
    )
  })
export default SuccessModal;

