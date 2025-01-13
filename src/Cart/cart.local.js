export const getLocalCart=()=>{
    return localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
}

export const saveLocalCart=(cart)=>{
    localStorage.setItem("cart",JSON.stringify(cart));
}

export const removeLocalCart=async ()=>{
   await localStorage.removeItem("cart");
}

