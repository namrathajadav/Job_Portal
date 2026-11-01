import { SET_IS_LOGGEDIN } from "./LoginActionTypes";

const initialState={
    isLoggedIn:false
}

const LoginReducer=(state={initialState},action)=>{
    switch(action.type){
        case SET_IS_LOGGEDIN:
            return{
                ...state,
                isLoggedIn:action.payload
            }
    default: return state
    }
}

export default LoginReducer;