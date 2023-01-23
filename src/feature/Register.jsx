import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Context from '../auth/Store';
import { db,auth } from '../firebase-config';
import {signInWithEmailAndPassword,createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
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
            sendEmailVerification(res.user).then(()=>{
                // alert("a email link is sent")
                toast('धन्यवाद हमने आपकी पंजीकृत ई मेल पर कान्फर्मैशन लिंक भेजा  है उसे क्लिक कर आप आपने पंजीकरण को प्रमाणित करे! ', {
                    icon: '👏',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                      },
                      duration: 6000,
                  });
            })
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
        <div className='form'>
        <h3>Register Form</h3>
         <form className="login-form" action="" onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="">Username</label>
                <input type="text" name='username' onChange={handleChange}/>

            </div>
            <div className="input-group">
                <label htmlFor="">Email</label>
                <input type="text" name='email' onChange={handleChange} />
                
            </div>
            <div className="input-group">
                <label htmlFor="">Password</label>
                <input type="passowrd" name='password' onChange={handleChange} />
            </div>
            <button type="submit" value="Submit" >Register</button>
                
         </form>
        </div>

    )
}

export default Register