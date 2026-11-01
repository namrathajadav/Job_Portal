import React,{useState,useEffect} from 'react';
import { TextField,Button } from '@mui/material';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import './Companies.css';
import GetAllCompanies from '../Redux/Thunk/GetAllCompaniesThunk';
import GetFilteredCompanies from '../Redux/Thunk/GetFilteredCompaniesThunk';
import Footer from '../Footer/Footer';

const Companies=()=>{
    const dispatch=useDispatch();
    var [companies,setCompanies]=useState([]);
    var [companyName,setCompanyName]=useState('')

    useEffect(()=>{
      dispatch(GetAllCompanies());
      if(companyName==''){
         dispatch(GetAllCompanies());
      }
    },[companyName])

   var loggedInUser={}
       var user=useSelector((store)=>store.User.user);
       if(user!=undefined){
           loggedInUser=user
       }

    var all_companies=[]
    var companies=useSelector((store)=>store.Companies.companies);
    if(companies!=undefined){
        all_companies=companies
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(GetFilteredCompanies(companyName));

    }
    return(
        <>
         <div className='company-banner'>
          <div style={{display:'inline-block',marginTop:"80px",textAlign:'left',marginRight:'200px'}}>

              <h2>Welcome, {loggedInUser.userName}</h2>
                           <h1 style={{color:'black'}}>Companies</h1>
           <p style={{fontSize:"14px",marginTop:'-20px'}}>Explore hiring companies and open roles across the portal.</p>
          <div className='company-search-card'>
          <form onSubmit={(e)=>submitHandler(e)}>
            <div style={{display:'inline-block',marginRight:'10px'}}>
                                   <TextField value={companyName} onChange={(e)=>setCompanyName(e.target.value)} variant="outlined" placeholder='Search Companies' style={{width:'200%'}}/>
            </div>
                   
            <div style={{display:'inline-block',marginLeft:'210px'}}>
           <Button type='submit' variant='contained' size='small' style={{backgroundColor:'green',marginTop:'20px'}}>Search</Button>
            </div>

          </form>
          </div> 
          {/* end of search card */}
          </div>

          <div className='list-of-companies'>
             
              <div className="list-of-categories" style={{marginTop:'50px',marginLeft:'10px'}}>
    {all_companies.length==0 && <h4>No Companies Found</h4>}
                     {
                        all_companies.length>0 && all_companies.map((company,index)=>{
                            return <> <div className='job-card' style={{width:'400px',display:'inline-block',marginRight:'15px'}}>
                               <span style={{display:'inline-block',marginRight:'50px',textAlign:'left'}}>
                       <img src={company.companyLogo} style={{width:'60px',height:'60px'}}/>
                               </span>

                                <span style={{display:'inline-block',textAlign:'left'}}>
                                    <h4>{company.companyName}</h4>
                                    <p style={{fontSize:'15px',marginTop:"-15px"}}>{company.companyTag}</p>
                                </span>
                            </div>
                            </>
                        })
                     }
                 </div>

          </div>

          </div>
          <Footer className='lift-up'/>
          </>
    )
}

export default Companies;