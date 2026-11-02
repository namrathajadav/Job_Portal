import { GET_ALL_JOBS, GET_FILTERED_JOBS,GET_CATEGORY_JOBS,GET_APPLIED_JOBS } from "./JobActionTypes";

const initialState={
    jobs:[],
    appliedJobs:[]
}

const JobReducer=(state={initialState},action)=>{
    switch(action.type){
        case GET_ALL_JOBS:
            return{
                ...state,
                jobs:action.payload
            }
            case GET_FILTERED_JOBS:
                return{
                    ...state,
                    jobs:action.payload
                }
                case GET_CATEGORY_JOBS:
                    return{
                        ...state,
                        jobs:action.payload
                    }
               case GET_APPLIED_JOBS:
                    return{
                        ...state,
                        appliedJobs:action.payload
               }
            default: return state
    }
}

export default JobReducer;
