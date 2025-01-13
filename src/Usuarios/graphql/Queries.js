import {apiPrivate} from "../../config/api";
import Usuario from "../usuario"
//Para obtener las compras de un usuario e informacion del usuario

  export const getCompras=async (uid)=>{
    try{
      const response = await apiPrivate.post('',{
        query:`
        query{
          obtenerComprasUid(uid:"${uid}"){
            uid,
            nombres,
            apellidos,
            correo,
            telefono,
            ciudad,
            direccion,
            compras,
            carro,
          }
        }
        `
      })
      const { data } = response.data;
        if (data && data.obtenerComprasUid) {
          return { success: true, data: data.obtenerComprasUid };
        } else {
          return { success: false, error: 'Error en la respuesta del servidor' };
        }
    }catch(error){
      return { success: false, error: 'Error en la solicitud' };
    }
  }

