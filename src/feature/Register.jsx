import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Context from '../auth/Store';
const Register = ()=>{
    const [state,dispatch] = useContext(Context)
    const {username,email,password} = state.credential
    const navigate = useNavigate()
    useEffect(()=>{
        console.log(state.credential)   
    })
    const handleSubmit = async(e)=>{
        e.preventDefault()
        const data = {username,email,password}
        console.log(data)
        axios.post("http://localhost:8080/user/register",data).then((res)=>{
            console.log(res)
            if(res.status==200){
                toast.success("User registred succesfully.")
            }
            dispatch({type:'CRED_SUBMITED'})
            navigate('/login')
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
        <h1>Register Form</h1>
         <form action="" onSubmit={handleSubmit}>
            <label htmlFor="">Username</label>
            <input type="text" name='username' onChange={handleChange}/>
            <label htmlFor="">Email</label>
            <input type="text" name='email' onChange={handleChange} />
            <label htmlFor="">Password</label>
            <input type="passowrd" name='password' onChange={handleChange} />
            <input type="submit" value="Submit" />
         </form>
        </>

    )
}

export default Register