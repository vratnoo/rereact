import React, { useState } from 'react'
import {Route,Routes,BrowserRouter,Link, Router} from 'react-router-dom'
import {Login,Register} from './Login'
import { app } from './firebase-config'
import {getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword} from 'firebase/auth'
const Test = ()=>{

   return (
      <>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <h2>Use is logged in</h2>
      </>
   )
}
function App(){
   const [email,setEmail] = useState("")
   const [password,setPassword] = useState("")
   
   
   const handleAction = (type)=>{
      console.log("Loggin pressed")
      const auth = getAuth()
      if(type=='login'){

      }else{

         createUserWithEmailAndPassword(auth,email,password).then((response)=>{
            console.log(response)
         })
      }
   }
   const props = {email,setEmail,password,setPassword,handleAction}
   return (
      <BrowserRouter>
         
            <Routes>
               <Route path="/" element={<Test/>}/>
               <Route path="/login" element={<Login {...props}/>}/>
               <Route path="/register" element={<Register {...props} />}/>
            </Routes>
         
      </BrowserRouter>
   )
}


export default App