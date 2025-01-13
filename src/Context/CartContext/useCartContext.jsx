import {  useContext } from 'react';
import { CartContext } from './CartContext';
export function useCartContext(){
    return useContext(CartContext)
  }