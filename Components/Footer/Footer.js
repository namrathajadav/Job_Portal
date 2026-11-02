import React,{useState} from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import SetIsLoggedIn from '../Redux/Thunk/SetIsLoggedInThunk';
import { Alert } from '@mui/material';

const Footer=(props)=>{
    const dispatch=useDispatch();

    var [showSuccessMessage,setShowSuccessMessage]=useState(false);

    var loggedInUser={}
    var user=useSelector((store)=>store.User.user);
    if(user!=undefined){
        loggedInUser=user
    }


    const logoutHandler=()=>{
       dispatch(SetIsLoggedIn(false));
       setShowSuccessMessage(true)
       setTimeout(()=>{
        setShowSuccessMessage(false)
       },2000)
    }

    return(
        <>
        {showSuccessMessage==true && <Alert severity='success'>User LoggedOut Successfully !</Alert>}
        <div className={`footer ${props.className}`} style={props.style}>
             <div className="footer-section" style={{marginTop:'50px',marginLeft:'180px'}}>

                <div style={{width:'350px',display:'inline-block',marginRight:'20px'}}>
                   <h3 style={{marginTop:'-2px',marginLeft:'5px'}}>
            Job Portal
       </h3>
       <p style={{fontSize:'14px'}}>Find roles that fit your life, or hire people who <br/>
       fit your team.
       </p>
        <ul className='footer-lists' style={{visibility:'hidden'}}>
                        <li ><h4>ACCOUNTS</h4></li>
                        <li  style={{marginTop:"-10px"}}>Sign In</li>
                        </ul>
                    </div>

                     <div style={{width:'350px',display:'inline-block',marginRight:'20px'}}>
                    <ul className='footer-lists'>
                        <li><h4>EXPLORE</h4></li>
                        <Link to='/home'><li style={{marginTop:"-10px"}}>Home</li></Link>
                        <Link to='/jobs'><li>Browse Jobs</li></Link>
                         <Link to='/companies'><li>Companies</li></Link>
                        {/* <li>Create Account</li> */}
                        <li>Post a Job</li>
                    </ul>
                    </div>


                     <div style={{width:'350px',display:'inline-block',marginRight:'20px'}}>
                   <ul className='footer-lists'>
                        <li ><h4>ACCOUNTS</h4></li>
                        <Link to='/myprofile'><li  style={{marginTop:"-10px"}}>Edit Profile</li></Link>
                        <Link to='/appliedJobs'><li>Applied Jobs</li></Link>
                         <Link to='/changePassword/'><li>Change Password</li></Link>
                       <Link to='/'><li onClick={()=>logoutHandler()}>Logout</li></Link>
                    </ul>
                    </div>
          </div>
        
        </div>
        </>

    )
}

export default Footer;
