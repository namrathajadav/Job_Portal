import { GET_ALL_COMPANIES, GET_FILTERED_COMPANIES} from "./CompaniesActionTypes";


export const get_all_companies=(data)=>{
    return{
        type:GET_ALL_COMPANIES,
        payload:data
    }
}

export const get_filtered_companies=(data)=>{
    return{
        type:GET_FILTERED_COMPANIES,
        payload:data
    }
}