import React, {useState,useEffect} from 'react';
import './CategoryJobs.css';
import { TextField,Button } from "@mui/material";
import {Select, MenuItem,FormControl} from "@mui/material";
import axios from "axios";
import Footer from "../Footer/Footer";
import { useDispatch,useSelector } from "react-redux";
import GetAllJobs from "../Redux/Thunk/GetAllJobsThunk";
import GetFilteredJobs from "../Redux/Thunk/GetFilteredJobsThunk";
import GetCategoryJobs from "../Redux/Thunk/GetCategoryJobsThunk";
import { FaLocationDot } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import ApplyToJobPosts from "../Redux/Thunk/ApplyToJobPostsThunk";
import { FaMoneyBillAlt } from "react-icons/fa";
import { ToastContainer,toast } from "react-toastify";

const SearchJobs=()=>{
        const dispatch=useDispatch();
        const params=useParams();

        var [jobRole,setJobRole]=useState('')
        var [jobLocation,setJobLocation]=useState('');
      

     var loggedInUser={}
            var user=useSelector((store)=>store.User.user);
            if(user!=undefined){
                loggedInUser=user;
            }

              var all_jobs=[]
                   var jobs=useSelector((store)=>store.Jobs.jobs)
                   if(jobs!=undefined){
                     all_jobs=jobs
              }

              
        useEffect(()=>{

            if(jobRole=='' && jobLocation==''){
              dispatch(GetAllJobs())
               
            }

        },[jobRole,jobLocation])

         useEffect(()=>{

            if(params.role!='' && params.location==''){
                setJobRole(params.role)
            }else if(params.role=='' && params.location!=''){
                setJobLocation(params.location)
            }else if(params.role!='' && params.location!=''){
                setJobRole(params.role)
                setJobLocation(params.location)
            }

            dispatch(GetFilteredJobs(jobRole,jobLocation,''))
      

        },[])


              const submitHandler=(e)=>{
                e.preventDefault();
                dispatch(GetFilteredJobs(jobRole,jobLocation,''));
                
                 
              }

                const applyToJobPostHandler=(jobpost)=>{
                    const data={
                      id:Math.random().toString(),
                      userId:loggedInUser.userId,
                      userName:loggedInUser.userName,
                      email:loggedInUser.email,
                      appliedJobs:[
                          {
                              jobId:Math.random().toString(),
                              jobTitle:jobpost.jobTitle,
                              companyName:jobpost.companyName,
                              companyLogo:jobpost.companyLogo,
                              category:jobpost.category,
                              jobType:jobpost.jobType,
                              skills:jobpost.skills,
                              location: jobpost.location,
                              workMode: jobpost.workmode,
                              salary: jobpost.salary,
                          }
                      ]
                    }
              
                    dispatch(ApplyToJobPosts(data))
                    toast.success(`Job Applied Successfully !`)
                  }
    
    return(
        <>
              <div className='category_jobs_banner'>
                <ToastContainer style={{fontSize:'16px'}}/>
                  <div>
                            <div style={{display:'inline-block',marginTop:"80px",textAlign:'left',marginRight:'200px'}}>
                                <h2>Welcome, {loggedInUser.userName}</h2>
                                   <h1 style={{color:'black'}}>Find your next Role</h1>
                   <p style={{fontSize:"14px",marginTop:'-20px'}}>Browse Open Positions and filter by category </p>
                    <div className='search-card'>
                         <form onSubmit={(e)=>submitHandler(e)}>
                                    <div style={{display:'inline-block',marginRight:'10px'}}>
                                        <label style={{fontSize:"14px"}}>ROLE</label><br/>
                                        <TextField  value={jobRole} onChange={(e)=>setJobRole(e.target.value)} variant="outlined" style={{width:'110%'}}/>
                                    </div>
                        
                                    <div style={{display:'inline-block',marginRight:'25px',marginLeft:'20px'}}>
                                        <label style={{fontSize:"14px"}}>LOCATION</label><br/>
                                        <TextField value={jobLocation} onChange={(e)=>setJobLocation(e.target.value)} variant="outlined" style={{width:'110%'}}/>
                                    </div>
                        
                                    <div style={{display:'inline-block',marginLeft:'5px'}}>
                                        <Button type='submit' variant='contained' size='small' style={{backgroundColor:'green',marginTop:'20px',height:'30px'}}>Search Jobs</Button>
                                    </div>
                        
                                    </form>
                    </div>
                
                    
                    </div>
                    </div>
        
                    <div className='job-lists'>
        
                             <div className="list-of-categories" style={{marginTop:'50px',marginLeft:'10px'}}>
        
                         {all_jobs.length==0 && <h3>No Jobs Found</h3>}
                             {
                                all_jobs.length>0 && all_jobs.map((job,index)=>{
                                    return <> <div className='job-card' style={{width:'400px',display:'inline-block',marginRight:'15px',cursor:'pointer'}}>
                                       
                                        <span style={{display:'inline-block',marginRight:'150px'}}>
                                           <img src={job.companyLogo} style={{width:'60px',height:'50px'}}/>
                                        </span>
        
                                        <span style={{display:'inline-block'}}>
                                       <p style={{fontSize:'12px',backgroundColor:"rgb(215, 237, 215)",color:'green',border:"1px solid rgb(215, 237, 215)",padding:'5px',borderRadius:'10px'}}>{job.jobType}</p>
                                        </span>
        
                                       <div className='job-details' style={{marginTop:'-25px',textAlign:'left',marginLeft:'10px'}}>
                                        <h4 style={{textAlign:'left',marginLeft:'10px'}}>{job.jobTitle}</h4>
                                        <p style={{fontSize:'15px',color:"gray",marginTop:'-15px',marginLeft:'10px'}}>{job.companyName}</p>
                                        <ul className='skill-lists'> 
                                            {
                                            job.skills.map((skill)=>{
                                                return <li>{skill}</li>
                                            })
                                        }
                                        </ul>
                                        <span style={{display:'inline-block',marginRight:'70px'}}>
                                        <FaLocationDot style={{color:'green',marginLeft:'10px'}}/> {job.location}
                                        </span>
                                        <span style={{display:'inline-block',marginRight:'70px'}}>
                                            <FaMoneyBillAlt style={{color:'green'}}/> {job.salary}
                                        </span>
                                        <span style={{display:'inline-block'}}>
                                             <Button variant="contained" size='small' color='success' style={{borderRadius:'10px'}} onClick={()=>applyToJobPostHandler(job)}>Apply</Button>
                                        </span>
                                     </div>
                                    
                                    </div>
                                    </>
                                })
                             }
                            {/* </ul> */}
                         </div>
        
                    </div>
                </div>
                <Footer className='lift-up'/>
        </>
    )
}

export default SearchJobs;