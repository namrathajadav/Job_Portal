import React from 'react';
import './Footer.css';

const Footer=(props)=>{
    return(
        <div className={`footer ${props.className}`}>
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
                        {/* <li>Edit Profile</li>
                        <li>Applied Jobs</li> */}
                        </ul>
                    </div>

                     <div style={{width:'350px',display:'inline-block',marginRight:'20px'}}>
                    <ul className='footer-lists'>
                        <li><h4>EXPLORE</h4></li>
                        <li style={{marginTop:"-10px"}}>Browse Jobs</li>
                        <li>Companies</li>
                        <li>Create Account</li>
                        <li>Post a Job</li>
                    </ul>
                    </div>


                     <div style={{width:'350px',display:'inline-block',marginRight:'20px'}}>
                   <ul className='footer-lists'>
                        <li ><h4>ACCOUNTS</h4></li>
                        <li  style={{marginTop:"-10px"}}>Sign In</li>
                        <li>Edit Profile</li>
                        <li>Applied Jobs</li>
                        <li style={{visibility:'hidden'}}>Post a Job</li>
                    </ul>
                    </div>
          </div>
        
        </div>

    )
}

export default Footer;