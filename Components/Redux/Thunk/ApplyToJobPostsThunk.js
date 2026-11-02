import axios from "axios";

const ApplyToJobPosts=(data2)=>{
    return(dispatch)=>{
        var loadedPosts=[];
        var isUser=false;
        var isJobPost=false;
        axios.get(`http://localhost:3001/AppliedJobPosts`)
        .then((res)=>{
            return res.data
        }).then((data)=>{
            for(let i in data){
             loadedPosts.push(data[i])
            }
            if(loadedPosts.length==0){
                axios.post(`http://localhost:3001/AppliedJobPosts`,data2)

            }else if(loadedPosts.length>0){
                 for(let i in loadedPosts){
                    if(loadedPosts[i].userId==data2.userId){
                      isUser=true
                    }
                 }

                 if(isUser==false){
                      axios.post(`http://localhost:3001/AppliedJobPosts`,data2)
                 }else if(isUser==true){
                    for(let i in loadedPosts){
                        if(loadedPosts[i].userId==data2.userId){
                            for(let j in loadedPosts[i].appliedJobs){
                            if(loadedPosts[i].appliedJobs[j].jobId==data2.appliedJobs[0].jobId){
                                isJobPost=true
                            }
                          }
                          if(isJobPost==false){
                            var data3={
                                id:loadedPosts[i].id,
                                userId:loadedPosts[i].userId,
                                userName:loadedPosts[i].userName,
                                email:loadedPosts[i].email,
                                appliedJobs:[
                                    ...loadedPosts[i].appliedJobs,
                                    {
                                        jobId:data2.appliedJobs[0].jobId,
                                        jobTitle:data2.appliedJobs[0].jobTitle,
                                        companyName:data2.appliedJobs[0].companyName,
                                        companyLogo:data2.appliedJobs[0].companyLogo,
                                        category:data2.appliedJobs[0].category,
                                        jobType:data2.appliedJobs[0].jobType,
                                        skills:data2.appliedJobs[0].skills,
                                        location: data2.appliedJobs[0].location,
                                       workMode: data2.appliedJobs[0].workmode,
                                      salary: data2.appliedJobs[0].salary,

                                    }
                                ]
                            }
                            axios.put(`http://localhost:3001/AppliedJobPosts/${loadedPosts[i].id}`,data3)
                          }
                        }
                    }
                 }

            }
        })
    }

}

export default ApplyToJobPosts;
