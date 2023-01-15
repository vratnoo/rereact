import React, { useEffect } from 'react'
import { useContext } from 'react'
import Context from '../auth/Store'
import toast from 'react-hot-toast';
import axios from 'axios';
import Cookies from 'js-cookie'
import { Navigate, useNavigate } from 'react-router-dom';

const Login = ()=>{
    const [state,dispatch] = useContext(Context)
    const navigate = useNavigate()
    
  
    const {username,password} = state.credential
    const data = {username,password}
    const token = Cookies.get('token')
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(token){
            data.sessionID = token
        }
         axios.post("http://localhost:8080/user/login",data).then((res)=>{
            
            if(res.status==200 && res.data.sessionID){
                Cookies.set('token',res.data.sessionID)
                toast.success(res.data.msg)
                dispatch({type:'USER_AUTHENICATED'})
            }
            dispatch({type:'CRED_SUBMITED'})
            // navigate('/')

                
        }).catch(({response})=>{
            if(response.data.msg){
                toast.error(response.data.msg)
            }
            console.log(response)
        })

    }
    const handleChange = (e)=>{
            const [name,value] = [e.target.name,e.target.value]
            dispatch({type:'CRED_CHANGE',data:{[name]:value}})
   }
    return (
        <>
        <h1>Loginfomrm auth</h1>
          <form action="">
             <label htmlFor="">UserName</label>
             <input type="text" name="username" value={username}  onChange={handleChange}/>
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