import { Usuario } from "../../Usuarios/usuario"

export function AuthResponse(usuario, accessToken, refreshToken){
   return {
    Usuario:usuario,
    accessToken,
    refreshToken
   }
}

export function AuthResponseError(message){
   return {
    message
   }
}

