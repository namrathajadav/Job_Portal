import React,{useState} from "react";
import './Header.css';
import image from '../Images/job_header_images.jpg';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

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

  var [activePage,setActivePage]=useState('home');

  var isUserLoggedIn=false;
  var isLoggedIn=useSelector((store)=>store.Login.isLoggedIn);
  if(isLoggedIn!=undefined){
    isUserLoggedIn=isLoggedIn;
  }
 
    return(
        <div className='header'>
        <h2 style={{marginTop:'-2px',marginLeft:'5px',color:'green'}}>
            Job Portal
       </h2>
       {isUserLoggedIn==true && <ul className="headers">
         <Link to='/home'><li style={{color:activePage=='home'?'green':'black'}}>Home</li></Link>
         <Link to='/jobs' ><li onClick={()=>setActivePage('jobs')} style={{color:activePage=='jobs'?'green':'black'}}>Jobs</li></Link>
           <Link to='/companies' ><li onClick={()=>setActivePage('companies')} style={{color:activePage=='companies'?"green":"black"}}>Companies</li></Link>
         <Link to='/myprofile' ><li onClick={()=>setActivePage('profile')} style={{color:activePage=='profile'?"green":"black"}}>My Profile</li></Link>
       </ul>}
       </div>
    )
}

export default Header;