import {guardarCarro} from '../Cart/graphql/Mutations'
import {useUserContext} from '../Context/UserContext/useUserContext'
import { useCartContext } from '../Context/CartContext/useCartContext'
import {saveLocalCart} from '../Cart/cart.local'
export default function useSaveCart(product){
    const {isAuth,userData} = useUserContext()
    const {cartProducts,setCartProducts} = useCartContext();
    async function saveCart(product){
        if(isAuth){
            const response = await guardarCarro(userData.uid,product)
            if(response.success){
                setCartProducts([...cartProducts, product]);
                saveLocalCart([...cartProducts, product]);
            }
        }else{
            setCartProducts([...cartProducts, product]);
            saveLocalCart([...cartProducts, product]);
        }
        return true; 
    }
    return saveCart(product);
}