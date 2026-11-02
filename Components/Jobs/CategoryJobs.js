import React,{useEffect,useState} from "react";
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
import GetAllCategories from "../Redux/Thunk/GetAllCategoriesThunk";

const CategoryJobs=()=>{
    const dispatch=useDispatch();
    const params=useParams();
    var category=params.jobCategory;

    useEffect(()=>{
        dispatch(GetCategoryJobs(category));
        dispatch(GetAllCategories())
    },[])

      var all_jobs=[]
       var jobs=useSelector((store)=>store.Jobs.jobs)
       if(jobs!=undefined){
         all_jobs=jobs
       }

       var all_categories=[];
       var categories=useSelector((store)=>store.Category.categories);
       if(categories!=undefined){
        all_categories=categories
       }

      

    var [categoryName,setCategoryName]=useState('');

    useEffect(()=>{
        if(categoryName==''){
            dispatch(GetAllJobs())
             if(jobs!=undefined){
         all_jobs=jobs
       }
        }

    },[categoryName])

    
        var loggedInUser={}
        var user=useSelector((store)=>store.User.user);
        if(user!=undefined){
            loggedInUser=user;
        }

        const submitHandler=(e)=>{
            e.preventDefault();
         dispatch(GetCategoryJobs(categoryName));

         if(categoryName==''){
            dispatch(GetAllJobs());
         }
  
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
        
                            <div style={{display:'inline-block',marginRight:'15px',marginLeft:'10px'}}>
                                <label style={{fontSize:"14px"}}>CATEGORY</label><br/>
                              <FormControl >
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={categoryName}
            onChange={(e)=>setCategoryName(e.target.value)}
             style={{width:"200%"}}
          >
            <MenuItem value=''>All Categories</MenuItem>
            {/* <MenuItem value='software_engineering'>Software Engineering</MenuItem>
            <MenuItem value='cyber_security'>Cyber security</MenuItem> */}
            {
                all_categories.map((categories)=>{
                return <MenuItem value={categories.categoryValue}>{categories.categoryName}</MenuItem>
                })
            }
          </Select>
        </FormControl>
                            </div>
                
                            <div style={{display:'inline-block',marginLeft:'200px'}}>
                                <Button type='submit' variant='contained' size='small' style={{backgroundColor:'green',marginTop:'20px',height:'30px'}}>Search Jobs</Button>
                            </div>
                
                            </form>
                    </div>
                
                    
                    </div>
                    </div>
        
                    <div className='job-lists'>
        
                             <div className="list-of-categories" style={{marginTop:'50px',marginLeft:'10px'}}>
        
                         {all_jobs.length==0 && <h3>No Jobs Found</h3>}
                            {/* <ul className="job-listings"> */}
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

export default CategoryJobs;