import React, { useEffect } from 'react'
import { useContext } from 'react'
import Context from '../auth/Store'
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import { app } from '../firebase-config';
import {getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword} from 'firebase/auth'

import { async } from '@firebase/util';
const Login = ()=>{
    const [state,dispatch] = useContext(Context)
    const navigate = useNavigate()
    
  
    const {email,password} = state.credential
    const data = {email,password}


    const handleSubmit = async()=>{
        const authentication = getAuth(app)
        try {
            const res = await signInWithEmailAndPassword(authentication,email,password)
            console.log(res)
            sessionStorage.setItem('Token', res._tokenResponse.idToken)
            dispatch({type:'USER_AUTHENICATED'})
          } catch (err) {
            console.error(err);
            alert(err.message);
          }finally{
            dispatch({type:"CRED_SUBMITED"})
          }


    }
       
    
    const handleChange = (e)=>{
            const [name,value] = [e.target.name,e.target.value]
            dispatch({type:'CRED_CHANGE',data:{[name]:value}})
   }
    return (
        <>
        <h1>Loginfomrm auth</h1>
          <form action="">
             <label htmlFor="">Email</label>
             <input type="text" name="email" value={email}  onChange={handleChange}/>
             <label htmlFor="password">password</label>
             <input type="password" name="password" value={password} onChange={handleChange} />
          </form>
         <button onClick={handleSubmit}>Login</button>
        </>
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