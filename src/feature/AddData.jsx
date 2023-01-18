import React, { useState,useEffect, useContext } from 'react'
import { db,auth } from '../firebase-config';
import { where,query,getFirestore,collection, addDoc, doc,getDocs,setDoc,deleteDoc,updateDoc } from "firebase/firestore/lite";
import Context from '../auth/Store';
import { toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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
    villageCode:{name:"No selected",code:0}
}

const AddData = ()=>{
    // const [landData,setLandData] = useState(initialState)
    const [data,setData] = useState(null)
    const [state,dispatch] = useContext(Context)

    const validationSchema = Yup.object({
      registrationId: Yup.string().min(5, "Registration id should be 5 charecter ").required(),
      landAccount: Yup.number().required(),
      landId: Yup.string().matches(/^(\d+\/\d+|\d+)$/, "value shoud be a valid khasra no  ").required("land id is required "),
      villageCode: Yup.object({code: Yup.number().notOneOf([0], "Invalid selection")})
    
    })


    const formik = useFormik({
        initialValues:initialState,
        validationSchema,
        onSubmit:(values)=>{
            handleSubmit(values)
            console.log(values)
        },
    })

//     useEffect(() => {
//     fetch("data.json")
//       .then((response) => response.json())
//       .then((values) => setLandData((values)=>values));
//      console.log(data)
//   }, []);

    const handleSubmit = async(landData)=>{
        
        const user = state.user
        try {
            const dataRef = doc(collection(db,'landData'))
            await setDoc(dataRef,{...landData,id:dataRef.id,uid:user.uid})            
        } catch (error) {
                toast.error('problem in submiting farmer details')
        }finally{
            toast.success('Farmer land data uploaded successfully.')
        }


    }
    const handleChange = (e)=>{
            
            if(e.target.name=='villageCode'){
                console.log("here")
                const result = villageCodes.find((village)=>village.code==e.target.value)
                console.log(result)                
                formik.setFieldValue('villageCode',result)
            }
                
        
    }

    return (
        <>
            <p>Add form for data</p>
            <form action="" onSubmit={formik.handleSubmit}>
                <label htmlFor="">Registration Id</label>
                <input type="text"  name="registrationId" value={formik.values.registrationId}  onBlur={formik.handleBlur}  onChange={formik.handleChange}/>
                {formik.touched.registrationId && formik.errors.registrationId ? <div className='error'>{formik.errors.registrationId}</div> : null}
                <label htmlFor="">Land Account (Khata no)</label>
                <input type="text"  name="landAccount" value={formik.values.landAccount}  onBlur={formik.handleBlur} onChange={formik.handleChange} />
                {formik.touched.landAccount && formik.errors.landAccount ? <div className='error'>{formik.errors.landAccount}</div> : null}
                <label htmlFor="">Land Id (Khasra No)</label>
                <input type="text"  name="landId"  value={formik.values.landId}  onBlur={formik.handleBlur} onChange={formik.handleChange} />
                {formik.touched.landId && formik.errors.landId ? <div className='error'>{formik.errors.landId}</div> : null}
                <label htmlFor="">Select Village</label>
                <select name="villageCode" id=""   onChange={handleChange}>
                {villageCodes.map((village,index)=>{
                    return (<option key={index} value={village.code}>{village.name}</option> )
                })}
                </select>
                {formik.touched.villageCode && formik.errors.villageCode ? <div className='error'>{formik.errors.villageCode.code}</div> : null}
                <button type="submit">Submit</button>
            </form>

                    
            
        </>
    )
}
export default AddData