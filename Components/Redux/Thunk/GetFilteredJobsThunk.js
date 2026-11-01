import { get_filtered_jobs } from "../Jobs/JobActions";
import axios from "axios";

const GetFilteredJobs=(searchRole,location,category)=>{
    
    return(dispatch)=>{
        var loadedJobPosts=[]
        var filteredJobs=[]
        axios.get(`http://localhost:3001/Job_Posts`)
        .then((res)=>{
            return res.data
        }).then((data)=>{
            for(let i in data){
                loadedJobPosts.push(data[i])
            }
            if(loadedJobPosts.length>0){
              if(searchRole!='' && location=='' && category==''){
                for(let i in loadedJobPosts){
                   if(loadedJobPosts[i].jobTitle==searchRole){
                        filteredJobs.push(loadedJobPosts[i])
                    }
                }
            }
              else if(searchRole!='' && location!='' && category==''){
                for(let i in loadedJobPosts){
                    if(loadedJobPosts[i].jobTitle==searchRole && loadedJobPosts[i].location==location){
                        filteredJobs.push(loadedJobPosts[i])
                    }
                }
              }
              else if(searchRole!='' && location!='' && category!=''){
             for(let i in loadedJobPosts){
                    if(loadedJobPosts[i].jobTitle==searchRole && loadedJobPosts[i].location==location && loadedJobPosts[i].category==category){
                        filteredJobs.push(loadedJobPosts[i])
                    }
                }
              }
            else if(searchRole=='' && location!='' && category!=''){
                 for(let i in loadedJobPosts){
                    if(loadedJobPosts[i].location==location && loadedJobPosts[i].category==category){
                        filteredJobs.push(loadedJobPosts[i])
                    }
                }
            }
            else if(searchRole=='' && location=='' && category!=''){
                   for(let i in loadedJobPosts){
                    if(loadedJobPosts[i].category==category){
                        filteredJobs.push(loadedJobPosts[i])
                    }
                }
            }
            else if(searchRole=='' && location!='' && category==''){
                for(let i in loadedJobPosts){
                    if(loadedJobPosts[i].location==location){
                        filteredJobs.push(loadedJobPosts[i])
                    }
                }
            }else if(searchRole!='' && location=='' && category!=''){
                 for(let i in loadedJobPosts){
                    if(loadedJobPosts[i].jobTitle==searchRole && loadedJobPosts[i].category==category){
                        filteredJobs.push(loadedJobPosts[i])
                    }
                }
            }
            dispatch(get_filtered_jobs(filteredJobs))
        }
        })

    }
}

export default GetFilteredJobs;