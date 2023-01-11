import http from "./httpService"
import config from "../config.json"

const apiEndpoint = config.apiUrl;

export const getCheckoutSession = (items, email)=>{
    return http.post(`${apiEndpoint}/create-checkout-session`,{
        items,
        email,
    })
}