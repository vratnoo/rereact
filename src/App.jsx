import React, { useEffect } from 'react'
import Login from './feature/Login'
import Home from './feature/Home'
import Register from './feature/Register'
import { Route,Routes } from 'react-router-dom'
import Navigaion from './components/Navigation'
import { useContext } from 'react'
import { Toaster } from 'react-hot-toast';
import Context from './auth/Store'
import Protected from './auth/Protected'
import Profile from './feature/Profile'
import { app } from './firebase-config'
import { getAuth,signInWithCustomToken,onAuthStateChanged } from 'firebase/auth'

const App = ()=>{
   
    const [state, dispatch] = useContext(Context);
    useEffect(() => {
        
            const authentication  = getAuth(app)
             onAuthStateChanged(authentication,(user)=>{
                if(user){
                    dispatch({type:"USER_AUTHENICATED"})
                }else{
                    
                    dispatch({type:"USER_LOGEDOUT"})
                }
            })
                    
     
        
     
    }, []);
    
    return(
        <>

        <Toaster/>
        <Navigaion/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/profile" element={
                    <Protected auth={state.auth}>
                        <Profile/>        
                    </Protected>
                }/>
                <Route  path="/login" element={
                    <Protected auth={!state.auth}>
                        <Login/>        
                    </Protected>

                }/>
                <Route  path="/register" element={<Protected auth={!state.auth}>
                        <Register/>        
                    </Protected>}/>
            </Routes>
        
        </>
    )
}

export default App