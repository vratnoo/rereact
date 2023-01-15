import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Context from '../auth/Store';
import { app } from '../firebase-config';
import {getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword} from 'firebase/auth'
import { getFirestore,collection, addDoc, doc,getDocs,setDoc,deleteDoc,updateDoc } from "firebase/firestore/lite";
const firestore = getFirestore(app)

export const todayDate = ()=>{
    const today = new Date().toISOString().slice(0, 10)
    console.log("Date check is here",new Date(today).toISOString())
    return new Date(today).toISOString()
}

const Register = ()=>{
    const [state,dispatch] = useContext(Context)
    const {username,email,password} = state.credential
    const navigate = useNavigate()
    useEffect(()=>{
        console.log(state.credential)   
    })
    const handleSubmit = async(e)=>{
        e.preventDefault()
        const authentication = getAuth(app)
        const data = {username:username,Role:"normal",created:todayDate()}
        try {
            const res = await createUserWithEmailAndPassword(authentication,email,password)
            const userRef = doc(collection(firestore,'users'));
            await setDoc(userRef, {...data,id:res.user.uid}); 
          } catch (err) {
            console.error(err);
            alert(err.message);
          }


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