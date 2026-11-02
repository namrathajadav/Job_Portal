import { get_category_jobs } from "../Jobs/JobActions";
import axios from "axios";

const GetCategoryJobs=(categoryName)=>{
    return(dispatch)=>{
        var loaded_category_jobs=[]
        axios.get(`http://localhost:3001/Job_Posts`)
        .then((res)=>{
            return res.data
        }).then((data)=>{
            for(let i in data){
                if(data[i].category==categoryName){
                  loaded_category_jobs.push(data[i])
                }
            }
            dispatch(get_category_jobs(loaded_category_jobs));
        })
    }
}

export default GetCategoryJobs;