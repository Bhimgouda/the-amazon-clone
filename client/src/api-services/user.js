import http from "./httpService"
import config from "../config.json"

const {apiUrl: apiEndpoint} = config;

// To get user data if he has unexpired jwt token

export const getTokenUser = (token)=>{
    return http.get(`${apiEndpoint}/tokenUser`,{
        headers:{
          "x-access-token": token,
        },
      })
}

export const loginUser = (user)=>{
    return http.post(`${apiEndpoint}/login`, user)
}

export const registerUser = (user)=>{
    return http.post(`${apiEndpoint}/register`, user);
}