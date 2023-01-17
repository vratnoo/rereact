import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Context from '../auth/Store';
import { db,auth } from '../firebase-config';
import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from 'firebase/auth'
import { where,query,getFirestore,collection, addDoc, doc,getDocs,setDoc,deleteDoc,updateDoc } from "firebase/firestore/lite";

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
        const data = {username:username,Role:"normal",created:todayDate()}
        const q  = query(collection(db,'users'),where("username","==",username))
        const queryFetch = await getDocs(q)
        if(queryFetch.docs.length!==0){
            toast.error('Username already exist')
            return 
        }
        try {
            const res = await createUserWithEmailAndPassword(auth,email,password)
            const userRef = doc(collection(db,'users'));
            await setDoc(userRef, {...data,id:res.user.uid})

          } catch (err) {
            console.error(err);
            alert(err.message);
          }finally{
            dispatch({type:"CRED_SUBMITED"})
            navigate('/login')
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