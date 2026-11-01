import { GET_ALL_JOBS, GET_FILTERED_JOBS } from "./JobActionTypes";

const initialState={
    jobs:[]
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
            default: return state
    }
}

export default JobReducer;