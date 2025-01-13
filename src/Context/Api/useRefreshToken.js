import { useEffect, useCallback } from 'react';
import { useUserContext } from '../UserContext/useUserContext';
import { refreshToken } from '../../Auth/graphql/Mutations';

const useRefreshToken = () => {
  const { userData, token, setToken } = useUserContext();

  const refresh = useCallback(async () => {
    try {
      if (!userData || !token) {
        return null;
      }
      const { uid, correo} = userData;
      const res = await refreshToken(uid, correo, token);
      if (res.success) {
        const newAccessToken = res.data.accessToken;
        setToken(newAccessToken);
        return newAccessToken;
      } else {
        console.error('Error al actualizar el token:', res.error);
        return null;
      }
    } catch (error) {
      console.error('Error en la solicitud de actualización del token:', error);
      return null;
    }
  }, [userData, token, setToken]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return refresh;
};

export default useRefreshToken;