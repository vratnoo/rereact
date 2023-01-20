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

const landData = {
  Farmer_Registration_No: "",
  Farmer_Name: "",
  Father_Name: "",
  LandLocation: "",
  LandOwnerShipID: "",
  LandID: "",
  LandStateLGDCode: "",
  LandDistrictLGDCode: "",
  LandSubDistrictLGDCode: "",
  LandBlockLGDCode: "",
  LandVillageLGDCode: "",
  LandVillageName: "",
  TypeOfMutation: "",
  DateOfMutation: "",
  LandAreaMeasurementUnit: "",
  LandArea: "",
  LandTransferDoneBefore01022019: "",
  LandOwnershipType: ""
}


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
      registrationId: Yup.string().matches(/^RJ\d{8}$/,"Registration id is not in valid formate RJ_______ (8 digit)").required("registration is required"),
      landAccount: Yup.number("Land account should be a number").required(),
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
        <div className='form_wrapper'>
            <h3>Add form for data</h3>
            <form action="" onSubmit={formik.handleSubmit}>
                <label htmlFor="">Registration Id</label>
                <input type="text"  name="registrationId" value={formik.values.registrationId}  onBlur={formik.handleBlur}  onChange={formik.handleChange}/>
                {formik.touched.registrationId && formik.errors.registrationId ? <div className='error'>{formik.errors.registrationId}</div> : null}
                <label htmlFor="farmer_name">Farmer Name</label>
                <input type="text" name="farmerName" />
                <label htmlFor="">Farmer Father Name</label>
                <input type="text"  name="fatherName"/>
                <label htmlFor="">Select Village</label>
                <select name="villageCode" id=""   onChange={handleChange}>
                {villageCodes.map((village,index)=>{
                    return (<option key={index} value={village.code}>{village.name}</option> )
                })}
                </select>
                {formik.touched.villageCode && formik.errors.villageCode ? <div className='error'>{formik.errors.villageCode.code}</div> : null}
                <label htmlFor="">Land Transfer Method</label>
                <select name="typeOfMutation" id="typeOfMutation">
                    <option value="1">Death of Husband</option>
                    <option value="2">Death of Father</option>
                    <option selected="selected" value="3">Ancester Land (Virasat)</option>
                    <option value="4">Purchase of Land</option>
                    <option value="5">Gifted</option>
                    <option value="6">Land Grant Allotment</option>
                </select>
                <label htmlFor="">Date of Mutation</label>
                <input type="date" name="DateOfMutation" id="DateOfMutation" />
                <label htmlFor="LandOwnershipType">Land Ownership Type</label>
                 <div className="radioGroup">
                 <label for="LandOwnershipType1">  
                  <input type="radio" name="LandOwnershipType" value='1' id="LandOwnershipType1" />  <i> SINGLE  :</i>
                  </label>
                 <label for="LandOwnershipType2">
                 <input type="radio" name="LandOwnershipType" value='2' id="LandOwnershipType2" /> 
                 <i> JOINT  :</i> 
                 </label>
                 </div>
                    
                <label htmlFor="">Land Account (Khata no)</label>
                <input type="text"  name="landAccount" value={formik.values.landAccount}  onBlur={formik.handleBlur} onChange={formik.handleChange} />
                {formik.touched.landAccount && formik.errors.landAccount ? <div className='error'>{formik.errors.landAccount}</div> : null}
                <label htmlFor="">Land Id (Khasra No)</label>
                <input type="text"  name="landId"  value={formik.values.landId}  onBlur={formik.handleBlur} onChange={formik.handleChange} />
                {formik.touched.landId && formik.errors.landId ? <div className='error'>{formik.errors.landId}</div> : null}
                <label htmlFor="">LandTransferDoneBefore01022019</label>
                <select name="LandTransferDoneBefore01022019" id="">
                    <option value="1">Before</option>
                    <option value="2">After</option>
                </select>
                <label htmlFor="">Land Area</label>
                <input type="text" name="landArea" id="" />
                <button type="submit">Submit</button>
            </form>

                    
            
        </div>
    )
}
export default AddData