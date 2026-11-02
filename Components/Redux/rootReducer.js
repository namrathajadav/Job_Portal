import { combineReducers } from "redux";
import JobReducer from "./Jobs/JobReducer";
import LoginReducer from "./Login/LoginReducer";
import CompaniesReducer from "./Companies/CompaniesReducer";
import UserReducer from "./User/UserReducer";
import CategoryReducer from "./Category/CategoryReducer";


const rootReducer=combineReducers({
    Jobs:JobReducer,
    Companies:CompaniesReducer,
    Login:LoginReducer,
    User:UserReducer,
    Category:CategoryReducer
})

export default rootReducer;
