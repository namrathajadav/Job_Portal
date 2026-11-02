import { GET_CATEGORIES } from "./CategoryActionTypes";

const initialState={
    categories:[]
}

const CategoryReducer=(state={initialState},action)=>{
    switch(action.type){
        case GET_CATEGORIES:
            return{
                ...state,
                categories:action.payload
            }
            default : return state
    }
}

export default CategoryReducer;