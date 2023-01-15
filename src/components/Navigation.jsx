import React, { useContext } from 'react'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import Context from '../auth/Store'
import Cookies from 'js-cookie'
import axios from 'axios'

export default function Navigaion(){
    const [state,dispatch] = useContext(Context)
    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.get("http://localhost:8080/user/logout").then((res)=>{
            Cookies.remove('token')
            toast.success(res.data.msg)
            dispatch({type:'USER_LOGEDOUT'})

            
    }).catch(({response})=>{
        if(response.data.msg){
            toast.error(response.data.msg)
        }
        console.log(response)
    })
    }
    return (
        <nav>
                    <li><Link to="/">Home</Link></li>
                    {<li><Link to="/Profile">Profile</Link></li>}
                    {(!state.auth)?<li><Link to="/login">Login</Link></li>:null}
                    {(!state.auth)?<li><Link to="/register">Register</Link></li>:null}
                    {(state.auth)?<li><Link onClick={handleSubmit} >Logout</Link></li>:null}
                    
        </nav>
    )
}