import { GET_ALL_JOBS,GET_FILTERED_JOBS } from "./JobActionTypes";


export const get_all_jobs=(data)=>{
    return{
        type:GET_ALL_JOBS,
        payload:data
    }
}


export const get_filtered_jobs=(data)=>{
    return{
        type:GET_FILTERED_JOBS,
        payload:data
    }
}