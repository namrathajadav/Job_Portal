import React,{useState,useEffect} from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { FaMoneyBillAlt } from "react-icons/fa";
import { Button } from '@mui/material';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

const JobItem=({job,onClick,appliedJobs,onShowAlert})=>{
    const navigate=useNavigate();
    const dispatch=useDispatch();
    var [isApplied,setIsApplied]=useState(false);


     var loggedInUser={}
        var user=useSelector((store)=>store.User.user);
        if(user!=undefined){
            loggedInUser=user;
        }

        
         useEffect(()=>{
              appliedJobs.map((appliedJob)=>{
            if(appliedJob.jobTitle==job.jobTitle){
             setIsApplied(true)
            }
        })

         },[])


         const applyingSameJobPostAgainHandler=()=>{
            if(isApplied==true){
               onShowAlert();
            }
         }
      

  

    return(
        <>
        {/* {showAlert==true && <Alert severity='error'>Already Applied to this Job.</Alert>} */}
        <div className='job-card' style={{width:'400px',display:'inline-block',marginRight:'15px',cursor:'pointer'}}>
                                       
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
                                        <span style={{display:'inline-block',marginRight:'60px'}}>
                                        <FaLocationDot style={{color:'green',marginLeft:'10px'}}/> {job.location}
                                        </span>
                                        <span style={{display:'inline-block',marginRight:'60px'}}>
                                            <FaMoneyBillAlt style={{color:'green'}}/> {job.salary}
                                        </span>
                                        <span style={{display:'inline-block'}}>
                                            {isApplied==false && <Button variant="contained" size='small' color='success' style={{borderRadius:'10px'}} onClick={()=>onClick(job)}>Apply</Button>}
                                            {isApplied==true && <Button variant="contained" size='small' color='success' style={{borderRadius:'10px'}} onClick={()=>applyingSameJobPostAgainHandler()}>Applied</Button>}
                                        </span>
                                     </div>
                                    
                                    </div>
                                    </>
    )
}

export default JobItem;