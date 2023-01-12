import React from 'react'
import Login from './feature/Login'
import Home from './feature/Home'
import Register from './feature/Register'
import { Route,Routes } from 'react-router-dom'
import Navigaion from './components/Navigation'
import Cookies from 'js-cookie'
import axios from 'axios'
const App = ()=>{

    const handleClick = ()=>{
        axios.post("http://localhost:8080/user/login",{
            username:"kridsf",
            password:"1234"
        }).then((res)=>{
            console.log(res)
            if(res.status==200 && res.data.sessionId){
                Cookies.set('token',res.data.sessionId)
            }
        }).catch((err)=>{
            console.log(err)
        })

        console.log("cokkies set")
        Cookies.set('vratnoo','is here')
    }

    const handleCheck = ()=>{
        const token = Cookies.get('token')
        console.log("tken",token)
        axios.post("http://localhost:8080/user/isAuth",{
            sessionID:token
        }).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    }

    return(
        <>
        <Navigaion/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route  path="/login" element={<Login/>}/>
                <Route  path="/register" element={<Register/>}/>
            </Routes>
            <button onClick={handleClick}>Set cokies</button>
            <button onClick={handleCheck}>Check cookies</button>
        </>
    )
}

export default App