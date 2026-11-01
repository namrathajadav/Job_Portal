import { get_filtered_companies } from "../Companies/CompaniesActions";
import axios from "axios";


const GetFilteredCompanies=(companyName)=>{
 return(dispatch)=>{
    console.log(companyName);
    var loadedCompanies=[]
    axios.get(`http://localhost:3001/Companies`)
    .then((res)=>{
        return res.data
    }).then((data)=>{
        for(let i in data){
           if(data[i].companyName.toLowerCase().includes(companyName.toLowerCase())){
            loadedCompanies.push(data[i])
           }
        }
        dispatch(get_filtered_companies(loadedCompanies))
        
    })
 }
}

export default GetFilteredCompanies;