import React,{useState} from "react";
import image from '../Images/home_banner_images.jpg';
import Card from "../Card/Card"; 
import { Button, TextField,Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { app } from "../../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import './Register.css';

const Register=()=>{
    const navigate=useNavigate();

    var [username,setUsername]=useState('');
    var [email,setEmail]=useState('');
    var [password,setPassword]=useState('');
    var [errors,setErrors]=useState({});
    var [showErrorMessage,setShowErrorMessage]=useState(false)
    var [showSuccessMessage,setShowSuccessMessage]=useState(false);


    const validate=()=>{
        var newErrors={}
        var nameRegex=/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;
        var emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
       var passwordRegex=/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%\^&*?&])[A-Za-z0-9!@#$%\^&*?&]{8,}$/
        if(!username){
        newErrors.userNameError='Enter Your Name'
        }else if(!(nameRegex.test(username))){
        newErrors.userNameError='Enter a Valid Name'
        }
        else if(!email){
            newErrors.emailError='Enter Your Email Address'
        }
        else if(!(emailRegex.test(email))){
            newErrors.emailError='Enter a Valid Email Address'
        }
        else if(!password){
            newErrors.passwordError='Enter Your Password'
        }else if(!(passwordRegex.test(password))){
            newErrors.passwordRegex='Enter a Valid Password'
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length==0
    }

    const auth = getAuth();
    

    function writeUserData(userId, userName, email, password,userImage) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    userId,
    userName,
    email,
    password,
    userImage
  });
}

    const submitHandler=(e)=>{
        e.preventDefault();
         if(validate()){

            createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    if(user.uid!=''){
  writeUserData(user.uid,username,email,password,'');
  setShowSuccessMessage(true)
  setTimeout(()=>{
   setShowSuccessMessage(false);
   navigate(`../`)
  },2000)
    }
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

         }else{
            setShowErrorMessage(true)
            setTimeout(()=>{
           setShowErrorMessage(false)
            },2000)
            return;
         }

    }

    return(
        <div className="container" >
          <img
        src={image}
        alt="User"
        className="user-image2"
      />

            <Card style={{marginLeft:'2px',width:'500px',height:'450px'}}>
           <form onSubmit={(e)=>submitHandler(e)}>
            {showSuccessMessage && <Alert severity="success">User Registered Successfully !</Alert>}
            {showErrorMessage && <Alert severity="error">{errors.userNameError && errors.userNameError||errors.emailError && errors.emailError||errors.passwordError && errors.passwordError}</Alert>}
        <h2 style={{color:'green'}}>Register</h2>
        <div>
          <label style={{marginLeft:'-320px'}}>UserName</label><br/>
          <TextField
          variant="outlined"
            value={username}
            style={{width:'80%'}}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div style={{marginTop:'20px'}}>
          <label style={{marginLeft:'-355px'}}>Email</label><br/>
          <TextField  style={{width:'80%'}}
           variant="outlined" value={email}  onChange={(e) => setEmail(e.target.value)}
          />
        </div>


        <div style={{marginTop:'20px'}}>
          <label style={{marginLeft:'-330px'}}>Password</label><br/>
          <TextField  style={{width:'80%'}}
           variant="outlined" type="password" value={password}  onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div style={{marginTop:"20px"}}>
        <Button type='submit' variant='contained' size='small' style={{backgroundColor:'green',color:'white',width:'80%',height:'40px'}}>Register</Button>
        </div>

      </form>
      <p style={{fontSize:'16px',color:'green',cursor:'pointer'}} onClick={()=>navigate(`../`)}>Already have an account ! Login</p>
            </Card>

        </div>
    )
}

export default Register;