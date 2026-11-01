import { set_is_loggedIn } from "../Login/LoginAction";
import axios from "axios";

const SetIsLoggedIn=(data)=>{
    return(dispatch)=>{
            var isLoggedIn=data;
        dispatch(set_is_loggedIn(isLoggedIn))
    }
}

export default SetIsLoggedIn;