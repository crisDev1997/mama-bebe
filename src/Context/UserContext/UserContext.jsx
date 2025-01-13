import React,{ createContext, useEffect, useState } from 'react';
import { useCartContext } from '../CartContext/useCartContext';
import { removeToken,getToken, setLocalToken } from '../../Auth/auth.local';
import { autoLogin,verifyToken} from '../../Auth/graphql/Queries';
import { removeLocalCart } from '../../Cart/cart.local';

export const UserContext = createContext({
    isAuth: false,
    userData:{},
    setUserData:()=>{},
    token:'',
    setToken:()=>{},
    setIsAuth:()=>{},
    logout:()=>{}
});

function UserProvider ({children}){
    const storagedToken = getToken() || '';
    const [token, setToken] = useState(storagedToken);
    const [userData, setUserData] = useState({});
    const {setCartProducts} = useCartContext();
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() =>{
      async function autoLog(){
        const verify=await verifyToken(storagedToken);
        if(verify.success){
          const response= await autoLogin(storagedToken);
          if(response.success){
            setIsAuth(true);
            setUserData(response.data.usuario);
            setCartProducts(response.data.usuario.carro);
            setToken(response.data.token);
            setLocalToken(response.data.token);
          }
        }else{
          setIsAuth(false);
          setUserData({});
          setToken('');
          removeToken();
        }
      }
     
      
      if(storagedToken.length>0){
        
        autoLog();
        console.log("solicitud");
        
      } 
    },[storagedToken])

    const logout = async () => {
      setIsAuth(false);
      setCartProducts([]);
      setToken('');
      setUserData({});
      await removeLocalCart();
      removeToken();
        return;
    }
    const userContext={userData,setUserData,token, setToken, logout, isAuth, setIsAuth};
 
    return (
        <UserContext.Provider value={userContext}>
          {children}
        </UserContext.Provider>
      );
}

export default UserProvider;