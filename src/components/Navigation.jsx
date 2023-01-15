import React, { useContext } from 'react'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import Context from '../auth/Store'
import Cookies from 'js-cookie'
import axios from 'axios'
import { app } from '../firebase-config'
import {signOut,getAuth} from 'firebase/auth'

export default function Navigaion(){
    const [state,dispatch] = useContext(Context)
    const handleSubmit = (e)=>{
        e.preventDefault()
        const auth = getAuth(app)
        signOut(auth);
        dispatch({type:'USER_LOGEDOUT'})
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