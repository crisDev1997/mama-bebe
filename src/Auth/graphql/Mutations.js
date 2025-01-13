import api, { apiPrivate } from "../../config/api";
export const iniciarSesion = async (correo, pass) => {
    try {
      const response = await api.post('', {
        query: `
          mutation {
            logearUsuario(loginAuthDto:{
              correo:"${correo}",
              pass:"${pass}",
            }),{
              usuario{
                uid,
                nombres,
                apellidos,
                correo,
                telefono,
                direccion,
                ciudad,
                carro{
                  id, 
                  nombre,
                  img,
                  precio,
                  cantidad,
                  subtotal,
                }
                compras{
                  id
                }
              },
              token
            }
          }
        `,
      });
  
      const { data } = response.data;
      if (data && data.logearUsuario) {
        return { success: true, data: data.logearUsuario };
      } else {
        return { success: false, error: 'Credenciales no validas, revise el correo y contraseña', status:400 };
      }
    } catch (error) {
      return { success: false, error: 'Error en la conexion con el servidor', status:500 };
    }
  };

  export const registrarse = async(values)=>{
    try {
        const response = await api.post('',{
            query:`
            mutation{
                registrarUsuario(registerAuthDto:{
                  nombres:"${values.nombres}",
                  apellidos:"${values.apellidos}",
                  correo:"${values.correo}",
                  telefono:"${values.telefono}",
                  ciudad:"${values.ciudad}",
                  direccion:"${values.direccion}",
                  pass:"${values.pass}"
                }),{
                  usuario{
                    uid,
                    nombres,
                    apellidos,
                    correo,
                    telefono,
                    direccion,
                    ciudad,
                    carro{
                      id, 
                      nombre,
                      precio,
                      cantidad,
                      subtotal,
                    }
                  },
                  token
                }
                }
            `
        })
        const { data } = response.data;
      if (data && data.registrarUsuario) {
        return { success: true, data: data.registrarUsuario };
      } else {
        return { success: false, error: 'Correo ya registrado', status:409 };
      }
    } catch (error) {
      return { success: false, error: 'Error en la conexion con el servidor', status:500 };
    }
  }

  export const refreshToken= async(uid, correo, token)=>{
    try {
      const response = await api.post('',{
          query:`
          mutation{
            refreshToken(refreshTokenInput:{
              uid:"${uid}", correo:"${correo}", token_anterior:"${token}"
            })
          }
          `
      })
      const { data } = response.data;
    if (data && data.registrarUsuario) {
      return { success: true, data: data.refreshToken };
    } else {
      return { success: false, error: 'Error en la respuesta del servidor' };
    }
  } catch (error) {
    return { success: false, error: 'Error en la solicitud' };
  }
  }


 export const recuperarCuenta = async (uid, pass) =>{
    try {
      const response = await api.post('',{
        query:`
        mutation{
          recuperarCuenta(uid:"${uid}", pass:"${pass}"){
            status,
            success,
            message
          }
        }`});
        const { data } = response.data;
        if (data && data.recuperarCuenta) {
          return { success: true, data: data.recuperarCuenta };
      }
      else {
        return { success: false, error: 'No se pudo actualizar correctamente la contraseña, reintente mas tarde', status:409 };
      }
    } catch (error) {
      return { success: false, error: 'Error en la conexion con el servidor, reintente mas tarde', status:500 };
    }
    
  } 
  export const activarCuenta = async(uid, tokenActivation)=>{ 
    try {
      const response = await api.post('',{
        query:`mutation{
          activarCuenta(uid:"${uid}", 
            tokenActivation:"${tokenActivation}"),{
            usuario{
              uid,
              nombres,
              apellidos,
              correo,
              telefono,
              direccion,
              ciudad,
            },
            status,
            message,
            token
          }
        }`});
        const { data } = response.data;
        if (data && data.activarCuenta) {
          return { success: true, data: data.activarCuenta };
      } else {
    return { success: false, error: 'Error en la respuesta del servidor' };
  }

    }catch(error) {
      return { success: false, error: 'Error en la conexion con el servidor', status:500 };
    }
  } 