import React,{useState} from "react";
import './Header.css';
import image from '../Images/job_header_images.jpg';
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import SetIsLoggedIn from "../Redux/Thunk/SetIsLoggedInThunk";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Header=()=>{
  const dispatch=useDispatch();
  const navigate=useNavigate();

  var [activePage,setActivePage]=useState('home');
  var [isDropdownVisible,setIsDropdownVisible]=useState(false);
  var [showSuccessMessage,setShowSuccessMessage]=useState(false);

  var isUserLoggedIn=false;
  var isLoggedIn=useSelector((store)=>store.Login.isLoggedIn);
  if(isLoggedIn!=undefined){
    isUserLoggedIn=isLoggedIn;
  }

  const handleMouseEnter=()=>{
    setIsDropdownVisible(true)
  }
 
  const handleMouseLeave=()=>{
    setIsDropdownVisible(false);
  }

  const logoutHandler=()=>{
    dispatch(SetIsLoggedIn(false));
    setShowSuccessMessage(true)
    setTimeout(()=>{
      setShowSuccessMessage(false);
    },2000)
  }

    return(
       <>
        <div className='header'>
        <h2 style={{marginTop:'-2px',marginLeft:'5px',color:'green'}}>
            Job Portal
       </h2>
       {isUserLoggedIn==true && <ul className="headers">
         <Link to='/home'><li style={{color:activePage=='home'?'green':'black'}}>Home</li></Link>
         <Link to='/jobs' ><li onClick={()=>setActivePage('jobs')} style={{color:activePage=='jobs'?'green':'black'}}>Jobs</li></Link>
           <Link to='/companies' ><li onClick={()=>setActivePage('companies')} style={{color:activePage=='companies'?"green":"black"}}>Companies</li></Link>
         <li onClick={()=>setActivePage('profile')} style={{color:activePage=='profile'?"green":"black"}}>
        <div className="dropdown">
Profile
<div className="dropdown-content">
<Link to='/myprofile'><a href="#">My Profile</a></Link>
<Link to='/appliedJobs'><a href="#">Applied Jobs</a></Link>
<Link to='/changePassword'><a href="#">Change Password</a></Link>
<Link to='/'><a onClick={()=>logoutHandler()}>Logout</a></Link>
</div>
</div>
          </li>
       </ul>}
       {showSuccessMessage==true && <Alert severity='success'>User LoggedOut Successfully !</Alert>}
       </div>
       </>
    )
}

export default Header;
