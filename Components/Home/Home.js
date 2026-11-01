import React from "react";
import image from '../Images/home_banner_images2.jpg';
import './Home.css';
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { MdWork } from "react-icons/md";
import Footer from '../Footer/Footer';
import { useSelector } from "react-redux";

const Home=()=>{

    var loggedInUser={}
    var user=useSelector((store)=>store.User.user);
    if(user!=undefined){
        loggedInUser=user
    }
   

    return(
        <>
        <div className='home_banner'>
            <div style={{display:'inline-block',marginTop:"80px",textAlign:'left',marginRight:'200px'}}>
                <h2>Welcome, {loggedInUser.userName}</h2>
                   <h1 style={{color:'black'}}>Find the Job  <span style={{color:'green'}}>that <br/>fits your life</span></h1>
   <p style={{fontSize:"14px",marginTop:'-20px'}}>Search Open roles. apply in a few steps, and keep your <br/>profile ready for employers</p>
    <div className='search-card'>
        <form>
            <div style={{display:'inline-block',marginRight:'10px'}}>
                <label style={{fontSize:"14px"}}>ROLE</label><br/>
                <TextField variant="outlined" style={{width:'110%'}}/>
            </div>

            <div style={{display:'inline-block',marginRight:'25px',marginLeft:'20px'}}>
                <label style={{fontSize:"14px"}}>LOCATION</label><br/>
                <TextField variant="outlined" style={{width:'110%'}}/>
            </div>

            <div style={{display:'inline-block',marginLeft:'5px'}}>
                <Button variant='contained' size='small' style={{backgroundColor:'green',marginTop:'20px',height:'30px'}}>Search Jobs</Button>
            </div>

            </form>
            <p style={{marginLeft:'10px',fontSize:"14px"}}>Create an Account</p>
    </div>

    
    </div>

    <div style={{display:'inline-block'}}>
        <img src={image} style={{marginTop:'80px'}}/>
    </div>
            </div>

            <div className='browse-categories'>
            <h2>Browse categories</h2>
            <p style={{fontSize:'14px',marginTop:'-15px',color:"gray"}}>Popular Job categories on Job Portal, ready to explore</p>

            <div className="list-of-categories" style={{marginTop:'50px',marginLeft:'10px'}}>

                <div style={{width:'350px',display:'inline-block',marginRight:'20px'}}>
                    <ul className="categories">
                        <li><MdWork className='work-icon'/> Software Engineering</li>
                         <li> <MdWork className='work-icon'/> Cyber Security</li>
                    <li><MdWork className='work-icon'/> Digital Marketing</li>
                          <li><MdWork className='work-icon'/> Customer Support</li>
                           <li><MdWork className='work-icon'/> Legal and Compliance</li>
                            <li><MdWork className='work-icon'/> Education and Training</li>
                             <li><MdWork className='work-icon'/> Hospitality and Travel</li>
                    </ul>
                </div>

                 <div style={{width:'350px',display:'inline-block',marginRight:'20px'}}>
                    <ul className="categories">
                        <li><MdWork className='work-icon'/>Data and AI</li>
                        <li><MdWork className='work-icon'/>UI/UX Design</li>
                        <li><MdWork className='work-icon'/>content & copywriting</li>
                        <li><MdWork className='work-icon'/>HR & Recruitment</li>
                        <li><MdWork className='work-icon'/>Operations</li>
                        <li><MdWork className='work-icon'/>Media & Communication</li>
                        <li><MdWork className='work-icon'/>Supply Chain & Procurement</li>
                        </ul>
                 </div>


                 <div style={{width:'350px',display:'inline-block'}}>
                    <ul className="categories">
                        <li><MdWork className='work-icon'/>Devops & Cloud</li>
                        <li><MdWork className='work-icon'/>Product Management</li>
                        <li><MdWork className='work-icon'/>Sales & Business Development</li>
                        <li><MdWork className='work-icon'/>Finance & Accounting</li>
                        <li><MdWork className='work-icon'/>HealthCare</li>
                        <li><MdWork className='work-icon'/>Architecture & Engineering</li>
                        <li style={{visibility:'hidden'}}>Hello</li>
                    </ul>
                 </div>

            </div>


            <div className='how-it-works'>
       <h2>How It Works</h2>
       <p style={{fontSize:'14px',marginTop:'-15px',color:'gray'}}>Three Clear Steps from signing up to landing your next oppurtunity</p>
          
           <div className="steps-to-follow" style={{marginTop:'50px',marginLeft:'10px'}}>
            <div style={{width:'350px',display:'inline-block',marginRight:'20px',textAlign:'left'}}>
   <h3 style={{color:'green'}}>01</h3>
   <h3 style={{marginTop:'-15px'}}>Create an Account</h3>
   <p style={{fontSize:'14px',color:'gray',marginTop:'-10px'}}>
    Sign up as a job seeker or employee and set<br/>your basic profile details .
   </p>
            </div>

              <div style={{width:'350px',display:'inline-block',marginRight:'20px',textAlign:'left'}}>
   <h3 style={{color:'green'}}>02</h3>
   <h3 style={{marginTop:'-15px'}}>Search Open Roles</h3>
   <p style={{fontSize:'14px',color:'gray',marginTop:'-10px'}}>
    Browse Categories and listings to find roles<br/> that match your skills.
   </p>
            </div>

             <div style={{width:'350px',display:'inline-block',marginRight:'20px',textAlign:'left'}}>
   <h3 style={{color:'green'}}>03</h3>
   <h3 style={{marginTop:'-15px'}}>Apply with Confidence</h3>
   <p style={{fontSize:'14px',color:'gray',marginTop:'-10px'}}>
    Submit applications, track status and keep<br/>your profile up to date.
   </p>
            </div>


          </div>
          
            </div>

            </div>

            <Footer/>
            </>
    )
}


export default Home;