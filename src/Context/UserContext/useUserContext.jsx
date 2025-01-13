import {  useContext, useDebugValue } from 'react';
import { UserContext } from './UserContext'; 


export function useUserContext(){
    const {userData}= useContext(UserContext);
    useDebugValue(userData, user=> user.correo ? "Logged In": "Logged Out");
    return useContext(UserContext);
  }