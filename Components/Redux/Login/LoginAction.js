import { SET_IS_LOGGEDIN } from "./LoginActionTypes";

export const set_is_loggedIn=(data)=>{
    return{
        type:SET_IS_LOGGEDIN,
        payload:data
    }
}