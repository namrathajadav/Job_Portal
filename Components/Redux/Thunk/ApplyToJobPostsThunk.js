import axios from "axios";

const ApplyToJobPosts=(data2)=>{
    return(dispatch)=>{
        var loadedPosts=[];
        var isUser=false;
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
                            var data3={
                                id:loadedPosts[i].id,
                                userId:loadedPosts[i].userId,
                                userName:loadedPosts[i].userName,
                                email:loadedPosts[i].email,
                                appliedJobs:[
                                    ...loadedPosts[i].appliedJobs,
                                    data2
                                ]
                            }
                            axios.put(`http://localhost:3001/AppliedJobPosts/${loadedPosts[i].id}`,data3)
                        }
                    }
                 }

            }
        })
    }

}

export default ApplyToJobPosts;