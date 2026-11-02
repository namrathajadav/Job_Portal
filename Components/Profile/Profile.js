import { TextField,Button } from '@mui/material';
import React, { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getAuth, updateProfile } from "firebase/auth";
import { getDatabase, ref,get, set,child, push, remove,update } from "firebase/database";
 import {createUserWithEmailAndPassword } from "firebase/auth";
import {  deleteUser } from "firebase/auth";
import Alert from '@mui/material/Alert';
import store from '../Redux/store';
import SetLoggedInUser from '../Redux/Thunk/SetLoggedInUserThunk';


const Profile=()=>{
    const dispatch=useDispatch();

    var [name,setName]=useState('');
    var [email,setEmail]=useState('');
    var [isEditUserClicked,setIsEditUserClicked]=useState(false);
    var [errors,setErrors]=useState({})
    var [showErrorMessage,setShowErrorMessage]=useState(false);
    var [showSuccessMessage,setShowSuccessMessage]=useState(false);

    var loggedInUser={};
   var user=useSelector((store)=>store.User.user);
   if(user!=undefined){
    loggedInUser=user;
   }

   useEffect(()=>{
 if(user!=undefined){
    loggedInUser=user;
    setName(loggedInUser.userName)
    setEmail(loggedInUser.email)
   }
   },[])

   const editUserProfileHandler=()=>{
    setIsEditUserClicked(true);
     document.getElementById('name').disabled=false;
     document.getElementById('email').disabled=false;
   }

   const auth = getAuth();
const currentUser = auth.currentUser;

//  function writeUserData(userId, userName, email, password,userImage) {
//   const db = getDatabase();
//   set(ref(db, 'users/' + userId), {
//     userId,
//     userName,
//     email,
//     password,
//     userImage
//   });
// }

const writeNewPost=(uid, username, email, password,userImage) =>{
  const db = getDatabase();

  // A post entry.
  const postData = {
    userId:uid,
    userName:username,
    email,
    password,
    userImage
  };

  // Get a key for a new Post.
//   const newPostKey = push(child(ref(db), 'users')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/users/' + uid] = postData;

  return update(ref(db), updates);
}


   const validate=()=>{
    var newErrors={}
      var nameRegex=/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;
        var emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!name){
        newErrors.nameError='Enter Your Name'
    }else if(!(nameRegex.test(name))){
           newErrors.nameError='Enter a Valid Name'
    }else if(!email){
        newErrors.emailError='Enter Your Email Address'
    }else if(!(emailRegex.test(email))){
        newErrors.emailError='Enter a Valid Email Address'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length==0
   }

   const updateUserProfileHandler=()=>{
    if(validate()){

        deleteUser(currentUser).then(() => {
  createUserWithEmailAndPassword(auth, email, loggedInUser.password)
   .then((userCredential) => {
     const user2 = userCredential.user;
     if(user2.uid!=''){
          const db = getDatabase();
          set(ref(db, 'users/' + loggedInUser.userId), {});
          delete(loggedInUser.userId);
          writeNewPost(user2.uid,name,email,loggedInUser.password,'');
        //   writeNewPost(user2.uid,name,email,loggedInUser.password,'');
       get(child(db, `users/${user2.uid}`)).then((snapshot) => {
  if (snapshot.exists()) {
       dispatch(SetLoggedInUser(snapshot.val()));
       if(user!=undefined){
    loggedInUser=user;
   }
        setShowSuccessMessage(true)
setTimeout(()=>{
setShowSuccessMessage(false)
},2000)
     }
    })
}
  
}).catch((error) => {
  
});


})


    }else{
        setShowErrorMessage(true)
        setTimeout(()=>{
 setShowErrorMessage(false)
        },2000)
        return;
    }

   }


    return(
        <div style={{marginTop:"120px"}}>
            {showSuccessMessage && <Alert severity='success'>User Updated Successfully ! </Alert>}
            {showErrorMessage && <Alert severity='error'>{errors.nameError && errors.nameError||errors.emailError && errors.emailerror}</Alert>}
   <h2 style={{marginLeft:'-270px'}}>Welcome, {loggedInUser.userName}</h2>
   <h2>User Profile</h2>
          <form>


            <div>
            <label style={{marginLeft:"-530px"}}>UserName</label><br/>
            <TextField variant='outlined' id='name' value={name} onChange={(e)=>setName(e.target.value)} style={{width:'40%'}} disabled/>
            </div>

              <div style={{marginTop:"20px"}}>
            <label style={{marginLeft:"-560px"}}>Email</label><br/>
            <TextField variant='outlined' id='email' value={email} onChange={(e)=>setEmail(e.target.value)}  style={{width:'40%'}} disabled/>
            </div>

<p style={{marginLeft:'510px',marginTop:'20px'}}>
{isEditUserClicked==false && <Button variant='contained' size='small' color='primary' onClick={()=>editUserProfileHandler()}>Edit Profile</Button>}
{isEditUserClicked==true && <Button variant='contained' size='small' color='success' onClick={()=>updateUserProfileHandler()}>Update Profile</Button>}
</p>

          </form>
        </div>
    )
}

export default Profile;
