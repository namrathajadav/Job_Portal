import { get_applied_jobs } from "../Jobs/JobActions";
import axios from "axios";

const GetAppliedJobs=(userId)=>{
    return(dispatch)=>{
        var loadedAppliedJobs=[]
        axios.get(`http://localhost:3001/AppliedJobPosts`)
        .then((res)=>{
            return res.data
        }).then((data)=>{
            for(let i in data){
             if(data[i].userId==userId){
                for(let j in data[i].appliedJobs){
                    loadedAppliedJobs.push(data[i].appliedJobs[j])
                }
             }
            }
            dispatch(get_applied_jobs(loadedAppliedJobs))
        })
    }
}

export default GetAppliedJobs;