import React, { useState,useEffect, useContext } from 'react'
import { db,auth } from '../firebase-config';
import { where,query,getFirestore,collection, addDoc, doc,getDocs,setDoc,deleteDoc,updateDoc } from "firebase/firestore/lite";
import Context from '../auth/Store';
import { toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup'
const villageCodes = [
    {'name':'No selected',code:0},
    {'name':'shiv',code:124554},
    {'name':'Goonga',code:4546},
    {'name':'Bhinyad',code:787},
    {'name':'Nimbala',code:7846},
]

const initialState = {
    registrationId:"",
    landAccount:"",
    landId:"",
    villageCode:{name:"",code:null}
}

const validate = values=>{
    const errors = {}
    if(!values.registrationId){
        errors.registrationId = "Required"
    }
    if(!values.landAccount){
        errors.landAccount  = "Required"
    }
    if(!values.landId){
        errors.landId = "Required"
    }
    if(!values.villageCode.code==0){
        errors.villageCode = "Please select village"
    }
    return errors
}

const AddData = ()=>{
    const [landData,setLandData] = useState(initialState)
    const [data,setData] = useState(null)
    const [state,dispatch] = useContext(Context)
    const formik = useFormik({
        initialValues:initialState,
        validate,
        onSubmit:(values)=>{
            console.log(values)
        },
    })

    useEffect(() => {
    fetch("data.json")
      .then((response) => response.json())
      .then((values) => setLandData((values)=>values));
     console.log(data)
  }, []);

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const user = state.user
        try {
            const dataRef = doc(collection(db,'landData'))
            await setDoc(dataRef,{...landData,id:dataRef.id,uid:user.uid})            
        } catch (error) {
                toast.error('problem in submiting farmer details')
        }finally{
            toast.success('Farmer land data uploaded successfully.')
            setLandData(initialState)
        }


    }
    const handleChange = (e)=>{
        setLandData((oldState)=>{
            if(e.target.name=='villageCode'){
                const result = villageCodes.find((value,index)=>{
                    return value.code==e.target.value
                })
                
                return {...oldState,[e.target.name]:{name:result.name,code:e.target.value}}
            }
            return {...oldState,[e.target.name]:e.target.value}
        })
    }

    return (
        <>
            <p>Add form for data</p>
            <form action="" onSubmit={formik.handleSubmit}>
                <label htmlFor="">Registration Id</label>
                <input type="text"  name="registrationId" value={formik.values.registrationId}  onBlur={formik.handleBlur} onChange={formik.handleChange}/>
                {formik.errors.registrationId ? <div>{formik.errors.registrationId}</div> : null}
                <label htmlFor="">Land Account (Khata no)</label>
                <input type="text"  name="landAccount" value={formik.values.landAccount}  onBlur={formik.handleBlur} onChange={formik.handleChange} />
                <label htmlFor="">Land Id (Khasra No)</label>
                <input type="text"  name="landId"  value={formik.values.landId}  onBlur={formik.handleBlur} onChange={formik.handleChange} />
                <label htmlFor="">Select Village</label>
                <select name="villageCode" id="" value={formik.values.villageCode.code}  onBlur={formik.handleBlur} onChange={formik.handleChange}>
                {villageCodes.map((village,index)=>{
                    return (<option key={index} value={village.code}>{village.name}</option> )
                })}
                </select>
                <button type="submit">Submit</button>
            </form>

                    
            
        </>
    )
}
export default AddData