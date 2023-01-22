import React, { useEffect } from 'react'
import Login from './feature/Login'
import Home from './feature/Home'
import Register from './feature/Register'
import { Route,Routes } from 'react-router-dom'
import Navigaion from './components/Navigation'
import { useContext } from 'react'
import { Toaster } from 'react-hot-toast';
import Context from './auth/Store'
import Protected from './auth/Protected'
import Profile from './feature/Profile'
import AddData from './feature/AddData'
import { db,auth } from './firebase-config';
import { toast } from 'react-hot-toast'
import {signInWithEmailAndPassword,onAuthStateChanged, createUserWithEmailAndPassword,signOut} from 'firebase/auth'
import { where,query,getFirestore,collection, addDoc, doc,getDocs,setDoc,deleteDoc,updateDoc } from "firebase/firestore/lite";
import Layout from './layout/Layout'
import ViewData from './feature/ViewData'
import { useState } from 'react'

const App = ()=>{
   
    const [state, dispatch] = useContext(Context);
    const [emailVerified,setEmailVerified] = useState(true)
    const [count,setCount] = useState(0)

    useEffect(() => {
      onAuthStateChanged(auth, async(user) => {
        if (user) {
            
            
          // getting user details from store
          const q = query(collection(db, "users"), where("id", "==", user.uid));
          const queryFetch = await getDocs(q);
          if (queryFetch.docs.length === 0) {
            toast.error("cannot find user details");
            signOut(auth);
            return;
          }
          const profile = queryFetch.docs.map((doc)=>doc.data())[0]

         

          dispatch({type:"USER_PROFILE_UPDATE",data:profile})
          dispatch({ type: "USER_AUTHENICATED", data: user });

          if(user.emailVerified===false){
            console.log("i am here ",user.emailVerified)
            toast.error('Please verify your email address')
            setEmailVerified(false)
            return
         }

        } else {
            setEmailVerified(true)
            toast.error("User No longer Logged in"); 
            dispatch({ type: "USER_LOGEDOUT" });
        }
      });

    }, []);

    if(state.auth && !emailVerified){
        console.log(auth.currentUser)
        console.log('auth',state.auth,emailVerified)
        return (<EmailVerification/>)
    }
    
    return(
        <>
        
        
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/profile" element={
                    <Protected auth={state.auth}>
                        <Profile/>        
                    </Protected>
                }/>
                <Route path="/addData" element={
                    <Protected auth={state.auth}>
                        <AddData/>        
                    </Protected>
                }/>
                
                <Route path="/viewData" element={
                    <Protected auth={state.auth}>
                        <ViewData/>        
                    </Protected>
                }/>

                <Route  path="/login" element={
                    <Protected auth={!state.auth}>
                        <Login/>        
                    </Protected>

                }/>
                <Route  path="/register" element={<Protected auth={!state.auth}>
                        <Register/>        
                    </Protected>}/>
            </Routes>
        
        </>
    )
}


function EmailVerification() {
    return (
        <div className="email">
            <h1>Please Verify your Email address.</h1>
            <p>Check your Inbox</p>
        </div>
      );
}

export default App