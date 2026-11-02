import { GET_ALL_JOBS,GET_FILTERED_JOBS,GET_CATEGORY_JOBS,GET_APPLIED_JOBS} from "./JobActionTypes";


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

export const get_category_jobs=(data)=>{
    return{
        type:GET_CATEGORY_JOBS,
        payload:data
    }
}

export const get_applied_jobs=(data)=>{
    return{
        type:GET_APPLIED_JOBS,
        payload:data
    }
}
