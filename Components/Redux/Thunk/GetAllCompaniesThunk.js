import { get_all_companies } from "../Companies/CompaniesActions";
import axios from "axios";


const GetAllCompanies=()=>{
    return(dispatch)=>{
        var loaded_companies=[];
        axios.get(`http://localhost:3001/Companies`)
        .then((res)=>{
            return res.data
        }).then((data)=>{
            for(let i in data){
                loaded_companies.push(data[i])
            }
           dispatch(get_all_companies(loaded_companies))
        })
        
    }
}

export default GetAllCompanies;