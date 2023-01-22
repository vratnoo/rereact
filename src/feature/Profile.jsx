import React, { useContext, useEffect } from 'react'
import Context from '../auth/Store'
import { where,query,getFirestore,collection, addDoc, doc,getDocs,setDoc,deleteDoc,updateDoc } from "firebase/firestore/lite";
import { db,auth } from '../firebase-config';
import { signOut } from 'firebase/auth';
import { toast } from 'react-hot-toast';
const Profile = ()=>{
    const [state,dispatch] = useContext(Context)
    
    useEffect(()=>{
        console.log()
    },[state.profile])

    const profile = state.profile
    return (
        <>
            <h1>Profile</h1>
        {state.profile && (
            <div>
            <p>user id : {profile.id}</p>
            <p>Everything is ok for user : {profile.username}</p>
            <p>Role: {profile.Role}</p>
            <p>create at : {profile.created}</p>
            </div>

        )}
        

        </>
    )
}

export default Profile