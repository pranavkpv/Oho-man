const ACCESS_KEY = "accessToken";

export const setAccessToken = (
 token:string
)=>{
 localStorage.setItem(
   ACCESS_KEY,
   token
 );
};

export const getAccessToken = ()=>{
 return localStorage.getItem(
   ACCESS_KEY
 );
};

export const removeAccessToken = ()=>{
 localStorage.removeItem(
   ACCESS_KEY
 );
};