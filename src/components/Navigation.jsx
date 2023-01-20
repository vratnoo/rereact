import React, { useContext } from 'react'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import Context from '../auth/Store'
import Cookies from 'js-cookie'
import axios from 'axios'
import { db,auth } from '../firebase-config'
import {signOut} from 'firebase/auth'

export default function Navigaion(){
    const [state,dispatch] = useContext(Context)
    const handleSubmit = (e)=>{
        e.preventDefault()
        
        signOut(auth);
        dispatch({type:'USER_LOGEDOUT'})
    }
  
    return (
        <nav>
                 <ul>
                 <li><Link to="/">Home</Link></li>
                    {<li><Link to="/Profile">Profile</Link></li>}
                    
                    {(state.auth)?<li><Link to="/addData">Add Data</Link></li>:null}
                    {(state.auth)?<li><Link to="/viewData">View Data</Link></li>:null}
                    {(!state.auth)?<li><Link to="/login">Login</Link></li>:null}
                    {(!state.auth)?<li><Link to="/register">Register</Link></li>:null}
                    {(state.auth)?<li><Link onClick={handleSubmit} >Logout</Link></li>:null}
                 </ul>
                    
        </nav>
    )
}