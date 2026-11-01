import { get_all_jobs } from "../Jobs/JobActions";
import axios from "axios";


const GetAllJobs=()=>{
    return(dispatch)=>{
        var loaded_jobs=[];
        axios.get(`http://localhost:3001/Job_Posts`)
        .then((res)=>{
            return res.data
        }).then((data)=>{
            for(let i in data){
                loaded_jobs.push(data[i])
            }
           dispatch(get_all_jobs(loaded_jobs))
        })
        
    }
}

export default GetAllJobs;