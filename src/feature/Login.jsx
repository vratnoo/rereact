import React from 'react'

const Login = ()=>{

    return (
        <h1>Loginfomrm</h1>
    )
}
const Logins  = (props)=>{
    const {username,setUsername,password,setPassword,handleSubmit} = props

    return(
        <div>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="">
                    Email
                </label>
                <input type="text" name="Email" value={username}  onChange={(e)=>setUsername(e.target.value)} id="Email" />
                <label htmlFor="password">Password</label>
                <input type="password" name="password"  value={password} onChange={(e)=>setPassword(e.target.value)} id="password" />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Login