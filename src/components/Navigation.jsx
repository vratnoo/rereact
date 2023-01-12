import React from 'react'
import { Link } from 'react-router-dom'

export default function Navigaion(){


    return (
        <nav>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/logout">Logout</Link></li>
        </nav>
    )
}