import api from "../../config/api";
export const guardarCarro = async (uid, carro) => {
    try {
        const variables = {
            uid,
            carro
          };
          const response = await api.post('', {
            query: `
              mutation($uid: String!, $carro: [ItemsInput!]!) {
                guardarCarro(uid: $uid, carro: $carro) {
                  success
                  message
                }
              }
            `,
            
            variables
          });
      const { data } = response.data;
          console.log(response)
      if (data && data.guardarCarro) {
        return { success: true, data: data.guardarCarro, mensaje: data.guardarCarro.message };
      } else {
        return { success: false, error: data.errors.message , status: data.errors.status  };
      }
    } catch (error) {
      console.log(error)
      return { success: false, error: 'Error en la conexion con el servidor', status:500 };
    }
  };

  export const eliminarProductoCarro = async (uid, index) => {
    try {
          const response = await api.post('', {
            query: `
            mutation{
              eliminarProductoCarro(uid:"${uid}",index:${index}){
                status,
                success,
                message
              }
            }
            `,

          });
      const { data } = response.data;
      //console.log(response)
      if (data && data.eliminarProductoCarro) {
        return { success: true, data: data.eliminarProductoCarro, mensaje: data.eliminarProductoCarro.message };
      } else {
        return { success: false, error: "No se puede eliminar un producto que no esta en el carro" , status: 409  };
      }
    } catch (error) {
      console.log(error)
      return { success: false, error: 'Error en la conexion con el servidor', status:500 };
    }
  };