import React, { useEffect,useState } from 'react';
import { Alert, Button, TextField } from '@mui/material';
import { useSelector,useDispatch } from 'react-redux';
import { app } from '../../firebase';
import { getAuth, updatePassword } from "firebase/auth";
import { getDatabase, ref, set, update } from "firebase/database";
import SetLoggedInUser from '../Redux/Thunk/SetLoggedInUserThunk';
import Footer from '../Footer/Footer';


const ChangePassword=()=>{
    const dispatch=useDispatch();

    var loggedInUser={};
    var user=useSelector((store)=>store.User.user);
    if(user!=undefined){
        loggedInUser=user;
    }

    var [username,setUserName]=useState('');
    var [email,setEmail]=useState('');
    var [oldPassword,setOldPassword]=useState('');
    var [newPassword,setNewPassword]=useState('');
    var [confirmPassword,setConfirmPassword]=useState('')
    var [showErrorMessage,setShowErrorMessage]=useState(false)
    var [showSuccessMessage,setShowSuccessMessage]=useState(false);
    var [errors,setErrors]=useState({});

    useEffect(()=>{
        if(loggedInUser!=undefined){
       setUserName(loggedInUser.userName)
       setEmail(loggedInUser.email)

        }
    },[]);

    const validate=()=>{
        var newErrors={};
         var passwordRegex=/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%\^&*?&])[A-Za-z0-9!@#$%\^&*?&]{8,}$/
        if(!oldPassword){
     newErrors.oldPasswordError='Enter Your Old Password'
        }else if(!(passwordRegex.test(oldPassword)) || oldPassword!=loggedInUser.password){
            newErrors.oldPasswordError='Enter a Valid Old Password'
        }else if(!newPassword){
            newErrors.newPasswordError='Enter a New Password'
        }else if(!(passwordRegex.test(newPassword))){
            newErrors.newPasswordError='Enter a Valid New Password'
        }else if(!confirmPassword){
            newErrors.confirmPasswordError='Enter a Confirm Password'
        }else if(!(passwordRegex.test(confirmPassword))){
          newErrors.confirmPasswordError='Enter a Valid Confirm Password'
        }else if(newPassword!=confirmPassword){
            newErrors.confirmPasswordError='New Password and confirm Password should be one and the same'
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length==0;
    }

    const auth = getAuth();
const currentUser = auth.currentUser;

function writeUserData(userId, username, email, password,userImage) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    userId,
    userName:username,
    email,
    password,
    userImage
  });
}


const deleteUser=(userId)=>{
  const db = getDatabase();
  const updates = {};
  updates['/users/' + userId] = {};

  return update(ref(db), updates);
}

    const submitHandler=(e)=>{
        e.preventDefault();
        if(validate()){

            updatePassword(currentUser, newPassword).then(() => {
                var details={
                    ...loggedInUser,
                    password:newPassword
                }
                dispatch(SetLoggedInUser(details));

                deleteUser(loggedInUser.userId);
                writeUserData(loggedInUser.userId,username,email,newPassword,'')

                setShowSuccessMessage(true)
                setTimeout(()=>{
                setShowSuccessMessage(false)
                },2000)

 
}).catch((error) => {
 
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
        <>
        <div style={{marginTop:"100px"}}>
            <h3 style={{marginLeft:'-600px'}}>Welcome, {loggedInUser.userName}</h3>
            <h2>Change Password</h2>
            <form onSubmit={(e)=>submitHandler(e)} style={{marginLeft:'-200px',marginTop:'40px'}}>
                  {showErrorMessage==true && <Alert severity='error' style={{width:'40%',marginLeft:'520px',marginBottom:'10px'}} >{errors.oldPasswordError && errors.oldPasswordError || errors.newPasswordError && errors.newPasswordError||errors.confirmPasswordError && errors.confirmPasswordError}</Alert>}
               {showSuccessMessage==true && <Alert severity='success'  style={{width:'40%',marginLeft:'520px',marginBottom:'10px'}}>Password Updated Successfully !</Alert>}
                <span style={{display:'inline-block',marginRight:'250px'}}>
                    <label style={{fontSize:"16px",marginLeft:'-130px'}}>User Name</label><br/>
                    <TextField value={username} variant='outlined' style={{width:'200%'}} disabled/>
                </span>

                <span style={{display:'inline-block'}}>
                    <label style={{fontSize:"16px",marginLeft:'-160px'}}>Email</label><br/>
                    <TextField variant='outlined' value={email}  style={{width:'200%'}} disabled/>
                </span><br/>

<span style={{display:'inline-block',marginTop:'15px',marginRight:'250px'}}>

                    <label  style={{fontSize:"16px",marginLeft:'-110px'}}>Old Password</label><br/>
                    <TextField value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} type='password' variant='outlined' style={{width:'200%'}}/>
                </span>

                 <span style={{display:'inline-block'}}>
                    <label style={{fontSize:"16px",marginLeft:'-115px'}}>New Password</label><br/>
                    <TextField  value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} type='password' variant='outlined' style={{width:'200%'}}/>
                </span><br/><br/>

                 <span style={{marginTop:'20px',marginLeft:'-300px'}}>
                    <label style={{fontSize:"16px",marginLeft:'-240px'}}>Confirm Password</label><br/>
                    <TextField value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} type='password' variant='outlined' style={{width:'25%',marginLeft:'-230px'}}/>
                </span>

               <br/><br/>

               <p style={{marginTop:'10px',marginLeft:'-500px'}}>
                <Button type='submit' variant='contained' size='small'>Change Password</Button>
               </p>

            </form>
        </div>
        <Footer style={{marginTop:'160px'}}/>
        </>
    )
}

export default ChangePassword;