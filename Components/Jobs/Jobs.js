import React,{useEffect,useState} from "react";
import './Jobs.css';
import { TextField,Button,Alert } from "@mui/material";
import {Select, MenuItem,FormControl} from "@mui/material";
import axios from "axios";
import Footer from "../Footer/Footer";
import { useDispatch,useSelector } from "react-redux";
import GetAllJobs from "../Redux/Thunk/GetAllJobsThunk";
import GetFilteredJobs from "../Redux/Thunk/GetFilteredJobsThunk";
import { FaLocationDot } from "react-icons/fa6";
import { FaMoneyBillAlt } from "react-icons/fa";
import { ToastContainer,toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import JobItem from "./JobItem";
import ApplyToJobPosts from "../Redux/Thunk/ApplyToJobPostsThunk";
import GetAppliedJobs from "../Redux/Thunk/GetAppliedJobsThunk";

const Jobs=()=>{
    const navigate=useNavigate();

    const dispatch=useDispatch();
    var [Jobs,setJobs]=useState([]);
     var [searchRole,setSearchRole]=useState('');
     var [location,setLocation]=useState('');
     var [category,setCategory]=useState('');
     var [showSuccessMessage,setShowSuccessMessage]=useState(false);
     var [showAlert,setShowAlert]=useState(false);

    useEffect(()=>{
        dispatch(GetAllJobs())
        dispatch(GetAppliedJobs(loggedInUser.userId))
        if(searchRole=='' ||location==''||category==''){
            dispatch(GetAllJobs())
        }
    },[searchRole,location,category]);

    var all_jobs=[]
    var jobs=useSelector((store)=>store.Jobs.jobs)
    if(jobs!=undefined){
  all_jobs=jobs
    }

    var loggedInUser={}
    var user=useSelector((store)=>store.User.user);
    if(user!=undefined){
        loggedInUser=user;
    }

    const searchJobsHandler=(e)=>{
        e.preventDefault();
        dispatch(GetFilteredJobs(searchRole,location,category));
    }

    

       

      const applyToJobPostHandler=(jobpost)=>{
              const data={
                id:Math.random().toString(),
                userId:loggedInUser.userId,
                userName:loggedInUser.userName,
                email:loggedInUser.email,
                appliedJobs:[
                    {
                        jobId:jobpost.id,
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
              setShowSuccessMessage(true)
              setTimeout(()=>{
            setShowSuccessMessage(false);
             dispatch(GetAppliedJobs(loggedInUser.userId))
            navigate(`../jobs`);
              },2000)
            }

             var all_applied_jobs=[]
    var appliedJobs=useSelector((store)=>store.Jobs.appliedJobs)
    if(appliedJobs!=undefined){
  all_applied_jobs=appliedJobs
    }
    const showAlertHandler=()=>{
        setShowAlert(true)
        setTimeout(()=>{
 setShowAlert(false)
        },2000)
    }


    return(
        <>
        <div className='jobs_banner'>
            {/* <ToastContainer style={{fontSize:'16px'}}/> */}
            <div>
                    <div style={{display:'inline-block',marginTop:"80px",textAlign:'left',marginRight:'200px'}}>
                        {showAlert==true && <Alert severity="error">Already applied to this Job</Alert>}
                       {showSuccessMessage && <Alert severity="success">Job Applied Successfully !</Alert>}
                        <h2>Welcome, {loggedInUser.userName}</h2>
                           <h1 style={{color:'black'}}>Find your next Role</h1>
           <p style={{fontSize:"14px",marginTop:'-20px'}}>Browse Open Positions and filter by title, location or category </p>
            <div className='search-card'>
                <form onSubmit={(e)=>searchJobsHandler(e)}>
                    <div style={{display:'inline-block',marginRight:'10px'}}>
                        <label style={{fontSize:"14px"}}>ROLE</label><br/>
                        <TextField value={searchRole} onChange={(e)=>setSearchRole(e.target.value)} variant="outlined" style={{width:'110%'}}/>
                    </div>
        
                    <div style={{display:'inline-block',marginRight:'25px',marginLeft:'20px'}}>
                        <label style={{fontSize:"14px"}}>LOCATION</label><br/>
                        <TextField value={location} onChange={(e)=>setLocation(e.target.value)} variant="outlined" style={{width:'110%'}}/>
                    </div>

                    <div style={{display:'inline-block',marginRight:'15px',marginLeft:'10px'}}>
                        <label style={{fontSize:"14px"}}>CATEGORY</label><br/>
                      <FormControl fullWidth>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={category}
    onChange={(e)=>setCategory(e.target.value)}
     style={{width:"250%"}}
  >
    <MenuItem value=''>All Categories</MenuItem>
    <MenuItem value='software_engineering'>Software Engineering</MenuItem>
      <MenuItem value='cyber_security'>Cyber security</MenuItem>
  </Select>
</FormControl>
                    </div>
        
                    <div style={{display:'inline-block',marginLeft:'110px'}}>
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
                            
                            return <> 
                            <JobItem job={job} onClick={applyToJobPostHandler} appliedJobs={all_applied_jobs}  onShowAlert={showAlertHandler}/>
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

export default Jobs;
