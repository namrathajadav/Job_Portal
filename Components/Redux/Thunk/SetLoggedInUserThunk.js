import { set_user } from "../User/UserActions"

import axios from "axios"


const SetLoggedInUser=(details)=>{
  return(dispatch)=>{
    var loggedInUser=details;
    dispatch(set_user(loggedInUser))
  }
}

export default SetLoggedInUser;