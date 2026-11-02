import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import './AppliedJobs.css';
import GetAppliedJobs from '../Redux/Thunk/GetAppliedJobsThunk';
import { FaLocationDot } from "react-icons/fa6";
import { FaMoneyBillAlt } from "react-icons/fa";
import store from '../Redux/store';

const AppliedJobs=()=>{
    const dispatch=useDispatch();

         var loggedInUser={}
                var user=useSelector((store)=>store.User.user);
                if(user!=undefined){
                    loggedInUser=user;
                }

                
    useEffect(()=>{
        dispatch(GetAppliedJobs(loggedInUser.userId))

    },[])

    var all_applied_jobs=[];
    var applied_jobs=useSelector((store)=>store.Jobs.appliedJobs);
    if(applied_jobs!=undefined){
        all_applied_jobs=applied_jobs;
    }

    console.log(all_applied_jobs);

    return(
        <>
              <div className='applied_jobs_banner'>
                         <div>
                            <div style={{display:'inline-block',marginTop:"80px",textAlign:'left',marginRight:'200px'}}>
                                <h2>Welcome, {loggedInUser.userName}</h2>
                                   <h1 style={{color:'black'}}>Applied Jobs</h1>
                                    <p style={{fontSize:"14px",marginTop:'-20px'}}>Job Roles and Positions for which you have applied</p>
                   
                            </div>
                            </div>
                              <div className='applied-job-lists'>
                                    
                                                         <div className="list-of-applied-jobs" style={{marginTop:'50px',marginLeft:'10px'}}>
                                    
                                                     {all_applied_jobs.length==0 && <h3>No Jobs Found</h3>}
                                                         {
                                                            all_applied_jobs.length>0 && all_applied_jobs.map((applied_job,index)=>{
                                                                return <> <div className='job-card' style={{width:'400px',display:'inline-block',marginRight:'15px',cursor:'pointer'}}>
                                                                   
                                                                    <span style={{display:'inline-block',marginRight:'150px'}}>
                                                                       <img src={applied_job.companyLogo} style={{width:'60px',height:'50px'}}/>
                                                                    </span>
                                    
                                                                    <span style={{display:'inline-block'}}>
                                                                   <p style={{fontSize:'12px',backgroundColor:"rgb(215, 237, 215)",color:'green',border:"1px solid rgb(215, 237, 215)",padding:'5px',borderRadius:'10px'}}>{applied_job.jobType}</p>
                                                                    </span>
                                    
                                                                   <div className='job-details' style={{marginTop:'-25px',textAlign:'left',marginLeft:'10px'}}>
                                                                    <h4 style={{textAlign:'left',marginLeft:'10px'}}>{applied_job.jobTitle}</h4>
                                                                    <p style={{fontSize:'15px',color:"gray",marginTop:'-15px',marginLeft:'10px'}}>{applied_job.companyName}</p>
                                                                    <ul className='skill-lists'> 
                                                                        {
                                                                        applied_job.skills.map((skill)=>{
                                                                            return <li>{skill}</li>
                                                                        })
                                                                    }
                                                                    </ul>
                                                                    <span style={{display:'inline-block',marginRight:'70px'}}>
                                                                    <FaLocationDot style={{color:'green',marginLeft:'10px'}}/> {applied_job.location}
                                                                    </span>
                                                                    <span style={{display:'inline-block',marginRight:'70px'}}>
                                                                        <FaMoneyBillAlt style={{color:'green'}}/> {applied_job.salary}
                                                                    </span>
                                                                    {/* <span style={{display:'inline-block'}}>
                                                                         <Button variant="contained" size='small' color='success' style={{borderRadius:'10px'}} onClick={()=>applyToJobPostHandler(job)}>Apply</Button>
                                                                    </span> */}
                                                                 </div>
                                                                
                                                                </div>
                                                                </>
                                                            })
                                                         }
                                                        {/* </ul> */}
                                                     </div>
                                    
                                                </div>
                  
              </div>
              </>
    )
}

export default AppliedJobs;