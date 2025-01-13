import api from "../../config/api"
//Para cambiar contraseña, nombres y apellidos, insertar compras, correo

export const cambiarPass = async ({oldPass, newPass}) => {
}

export const updateDatos = async (uid,data)=>{

}

export const setCompras = async (uid, items)=>{
    
}

export const enviarCorreo = async ({nombre, correo, mensaje})=>{
    try {
        const response = await api.post('',{
          query:`
          mutation {
            enviarCorreo(contactInput:{
              mensaje:"${mensaje}",
              correo:"${correo}",
              nombre:"${nombre}",
              
            }),{
              status,
              message
              success
            }
          }
          `
      })
      const { data } = response.data;
    if (data && data.enviarCorreo) {
  
      return { success: true, data: data.enviarCorreo };
    } else {
  
      return { success: false, error: response.data.errors[0].message};
    }
      } catch (error) {
        return { success: false, error: 'Error en la conexion con el servidor', status:500 };
      }
}