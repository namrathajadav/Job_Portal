import { SET_USER } from "./UserActionTypes";



export const set_user=(data)=>{
    return{
        type:SET_USER,
        payload:data
    }
}