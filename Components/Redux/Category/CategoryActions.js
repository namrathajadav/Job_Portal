import { GET_CATEGORIES } from "./CategoryActionTypes";


export const get_categories=(data)=>{
    return{
        type:GET_CATEGORIES,
        payload:data
    }
}