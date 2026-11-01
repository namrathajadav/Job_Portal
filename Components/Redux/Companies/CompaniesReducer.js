import { GET_ALL_COMPANIES,GET_FILTERED_COMPANIES } from "./CompaniesActionTypes";

const initialState={
    companies:[]
}

const CompaniesReducer=(state={initialState},action)=>{
    switch(action.type){
        case GET_ALL_COMPANIES:
            return{
                ...state,
                companies:action.payload
            }
        case GET_FILTERED_COMPANIES:
            return{
                ...state,
                companies:action.payload
            }
            default: return state
    }
}

export default CompaniesReducer;