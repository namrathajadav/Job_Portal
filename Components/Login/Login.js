import React,{useState} from "react";
import image from '../Images/home_banner_images3.jpeg';
import Card from "../Card/Card"; 
import { Alert, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {app} from '../../firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";
import { useSelector,useDispatch } from "react-redux";
import './Login.css';
import SetIsLoggedIn from "../Redux/Thunk/SetIsLoggedInThunk";
import SetLoggedInUser from "../Redux/Thunk/SetLoggedInUserThunk";

const Login=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();

    var [email,setEmail]=useState('');
    var [password,setPassword]=useState('');
    var [errors,setErrors]=useState({});
    var [showErrorMessage,setShowErrorMessage]=useState(false)
    var [showSuccessMessage,setShowSuccessMessage]=useState(false);

    const validate=()=>{
          var newErrors={};
                var emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
       var passwordRegex=/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%\^&*?&])[A-Za-z0-9!@#$%\^&*?&]{8,}$/
       if(!email){
       newErrors.emailError='Enter Your Email Address'

       }else if(!(emailRegex.test(email))){
        newErrors.emailError='Enter a Valid Email Address'

       }else if(!password){

        newErrors.passwordError='Enter Your Password'

       }else if(!(passwordRegex.test(password))){

         newErrors.passwordError='Enter a Valid Password'
       }
       setErrors(newErrors)
       return Object.keys(newErrors).length==0;
    }

    const auth=getAuth();
    const dbRef = ref(getDatabase());

    const submitHandler=(e)=>{
        e.preventDefault();
        if(validate()){

            signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    if(user.uid!=''){
        get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
  if (snapshot.exists()) {
       dispatch(SetIsLoggedIn(true));
       dispatch(SetLoggedInUser(snapshot.val()));
       setShowSuccessMessage(true)
       setTimeout(()=>{
      setShowSuccessMessage(false)
  navigate(`./home`);
       },2000)
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
       
    }
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });



        }else{
            setShowErrorMessage(true)
            setTimeout(()=>{
          setShowErrorMessage(false);
            },2000)
            return;
        }
      
    }

    return(
        <div className="container" >
          <img
        src={image}
        alt="User"
        className="user-image"
      />

            <Card style={{marginLeft:'2px'}}>
           <form onSubmit={(e)=>submitHandler(e)}>
            {showSuccessMessage && <Alert severity="success">User LoggedIn Successfully !</Alert>}
            {showErrorMessage && <Alert severity="error">{errors.emailError && errors.emailError ||errors.passwordError && errors.passwordError}</Alert>}
        <h2 style={{color:'green'}}>Login</h2>
        <div>
          <label style={{marginLeft:'-320px'}}>Email</label><br/>
          <TextField
          variant="outlined"
            value={email}
            style={{width:'80%'}}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={{marginTop:'20px'}}>
          <label style={{marginLeft:'-290px'}}>Password</label><br/>
          <TextField  style={{width:'80%'}}
           variant="outlined" type="password" value={password}  onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div style={{marginTop:"20px"}}>
        <Button type='submit' variant='contained' size='small' style={{backgroundColor:'green',color:'white',width:'80%',height:'40px'}}>Login</Button>
        </div>

      </form>
      <p style={{fontSize:'16px',color:'green',cursor:'pointer'}} onClick={()=>navigate(`./register`)}>Don't have an account yet ! Register</p>
            </Card>

        </div>
    )
}

export default Login;
