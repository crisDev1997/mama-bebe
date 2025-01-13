import { apiPrivate } from "../../config/api";
import api from "../../config/api";

export const autoLogin = async(token)=>{ 
    try {
      const response = await api.post('',{
        query:`query{
          getUserAutoLogin(token:"${token}"){
            usuario{
              uid,
              nombres,
              apellidos,
              correo,
              direccion,
              ciudad,
              carro{
                id,
                nombre,
                img,
                precio,
                cantidad,
                color,
                tamano,
                talla
              }
            },
            token,
            status
          }
        }`});
       
        const { data } = response.data;
      
        if (data && data.getUserAutoLogin) {
          return { success: true, data: data.getUserAutoLogin };
      } else {
    return { success: false, error: data.errors.message };
  }

    }catch(error) {
      return { success: false, error: error.message, status:500 };
    }
  } 

  export const verifyToken = async(token)=>{
    try {
      const response = await api.post('',{
        query:`
        query{
          verificarJWT(token:"${token}"),{
            status,
            success,
            message
          }
        }
        `
    })
    const { data } = response.data;
  if (data && data.verificarJWT) {
    return { success: true, data: data.verificarJWT };
  } else {
    return { success: false, error: response.data.errors[0].message};
  }
    } catch (error) {
      return { success: false, error: 'Error en la conexion con el servidor', status:500 };
    }
  }
  export const verifyRecoverToken = async(uid,token)=>{
    try {
      const response = await api.post('',{
        query:`
        query{
          verificarRecoverToken( uid:"${uid}",token:"${token}"),{
            status,
            success,
            message,
  
          }
        }
        `
    })
    const { data } = response.data;
    console.log(response);
  if (data && data.verificarRecoverToken) {

    return { success: true, data: data.verificarRecoverToken };
  } else {

    return { success: false, error: response.data.errors[0].message};
  }
    } catch (error) {
      return { success: false, error: 'Error en la conexion con el servidor', status:500 };
    }
  }

  export const sendRecoverAccount = async(email)=>{
    try {
      const response = await api.post('',{
        query:`
        query{
          enviarRecuperacionCuenta(correo:"${email}"){
            status,
            success,
            message
          }
        }
      `
    })
    const { data } = response.data;
    if (data && data.enviarRecuperacionCuenta) {
      return { success: true, data: data.enviarRecuperacionCuenta };
    }else
    {
      return { success: false, error: response.data.errors[0].message};
    }
    } catch (error) {
      return { success: false, error: 'Error en la conexion con el servidor', status:500 };
    }
  }