export const getToken=()=>{
    return localStorage.getItem("rols") ? JSON.parse(localStorage.getItem("rols")) : '';
}

export const setLocalToken=(token)=>{
    return window.localStorage.setItem("rols",JSON.stringify(token));
}

export const removeToken=()=>{
    return window.localStorage.removeItem("rols");
}

