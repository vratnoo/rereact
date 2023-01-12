import React from 'react'




const Login  = ({email,setEmail,password,setPassword,handleAction})=>{

    return (
        <div>
            <h1> Login Form</h1>
            <div>
                <label htmlFor="">Email</label>
                <input type="text" onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
                <label htmlFor="">Password</label>
                <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                <button onClick={()=>handleAction('login')}>Login</button>
            </div>

        </div>
    )
}

const Register = ({email,setEmail,password,setPassword,handleAction})=>{

    return (
        <div>
            <h1> Register Form</h1>
            <div>
                <label htmlFor="">Email</label>
                <input type="text" onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
                <label htmlFor="">Password</label>
                <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                <button onClick={()=>handleAction('register')}>Register</button>
            </div>

        </div>
    )
}

export  {Login,Register}