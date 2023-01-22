import React, { useEffect } from 'react'
import { useContext } from 'react'
import Context from '../auth/Store'
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import { db,auth } from '../firebase-config';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword,signOut} from 'firebase/auth'
import { where,query,getFirestore,collection, addDoc, doc,getDocs,setDoc,deleteDoc,updateDoc } from "firebase/firestore/lite";
const Login = ()=>{
    const [state,dispatch] = useContext(Context)
    const navigate = useNavigate()
    
  
    const {email,password} = state.credential
    const data = {email,password}


    const handleSubmit = async(e)=>{
      e.preventDefault()
        try {
            const res = await signInWithEmailAndPassword(auth,email,password)
            const user = res.user

            
            toast.success("user logged in sucessfully");
            dispatch({type:'USER_AUTHENICATED',data:user})
            

          } catch (err) {
            console.error(err);
            alert(err.message);
          }finally{
            dispatch({type:"CRED_SUBMITED"})
            navigate('/')
          }


    }
       
    
    const handleChange = (e)=>{
            const [name,value] = [e.target.name,e.target.value]
            dispatch({type:'CRED_CHANGE',data:{[name]:value}})
   }
    return (
        <div className='form'>
        <h3>Login Form</h3>
          <form className="login-form" action="" onSubmit={handleSubmit}>
            <div className="input-group">
             <label htmlFor="">Email</label>
             <input type="text" name="email" value={email} placeholder="name@email.com"  onChange={handleChange}/>
            </div>
            <div className="input-group">
             <label htmlFor="password">password</label>
             <input type="password" name="password" value={password} placeholder="password" onChange={handleChange} />
            </div>
            <button type='submit'>Login</button>
          </form>
        </div>



    )
}
// const Loginss  = (props)=>{
    

//     return(
//         <div>
//             <form action="" onSubmit={handleSubmit}>
//                 <label htmlFor="">
//                     Email
//                 </label>
//                 <input type="text" name="Email" value={username}  onChange={(e)=>setUsername(e.target.value)} id="Email" />
//                 <label htmlFor="password">Password</label>
//                 <input type="password" name="password"  value={password} onChange={(e)=>setPassword(e.target.value)} id="password" />
//                 <input type="submit" value="Submit" />
//             </form>
//         </div>
//     )
// }

export default Login