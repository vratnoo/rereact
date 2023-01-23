import React, { useState,useEffect, useContext, useRef } from 'react'
import { db,auth } from '../firebase-config';
import { where,query,getFirestore,collection, addDoc, doc,getDocs,setDoc,deleteDoc,updateDoc } from "firebase/firestore/lite";
import Context from '../auth/Store';
import { toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FileUploader from '../components/FileUpload';
import { useNavigate } from 'react-router-dom';
const initvillageCodes = [
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
    farmerName:"",
    fatherName:"",
    typeOfMutation:"3",
    dateOfMutation:"",
    landTransferDoneBefore01022019:0,
    landOwnershipType:"2",
    landArea:0,
    landAccount:"",
    landId:"",
    villageCode:{name:"No selected",code:0}
}

const AddDataNext = ({regId})=>{
    // const [landData,setLandData] = useState(initialState)
    const navigate = useNavigate()
    const [data,setData] = useState({})
    const [dataSubmited,setDataSubmited] = useState(false)
    const [state,dispatch] = useContext(Context)
    const [downloadURL,setDownloadURL] = useState(null)
    const [villageCodeList,setVillageCodeList]  = useState(initvillageCodes)
    initialState.registrationId = regId
    const validationSchema = Yup.object({
    registrationId: Yup.string().matches(/^RJ\d{8}$/,"Registration id is not in valid formate RJ_______ (8 digit)").required("registration is required"),
    farmerName:Yup.string().required(),
    fatherName:Yup.string().required(),
    typeOfMutation:Yup.number().required(),
    dateOfMutation:Yup.string().required(),
    landTransferDoneBefore01022019:Yup.number().required(),
    landOwnershipType:Yup.number().required(),
    landArea:Yup.number().required(),
      landAccount: Yup.number("Land account should be a number").required(),
      landId: Yup.string().matches(/^(\d+\/\d+|\d+)$/, "value shoud be a valid khasra no  ").required("land id is required "),
      villageCode: Yup.object({code: Yup.number().notOneOf([0], "Invalid selection")})
    
    })


    const formik = useFormik({
        initialValues:initialState,
        validationSchema,
        onSubmit:(values,{resetForm})=>{
            handleSubmit(values)
            resetForm()
            console.log(values)
        },
    })

    useEffect(() => {

        
    const fetchPromis = fetch("data.json")
      .then((response) => response.json())
      .then((values) => {
        // console.log(values)
        setVillageCodeList(values)
      });
      toast.promise(fetchPromis,{
        loading:"Village Data loading",
        success:"village data loaded",
        error:"Error while loading villages"
      })
  }, []);


    const handleSubmit = async(landData)=>{
        if(!downloadURL){
            toast.error("Please upload attechment")
            return 
        }
        const user = state.user
        try {
            const dataRef = doc(collection(db,'landData'))
            const sendData = {...landData,id:dataRef.id,uid:user.uid,attechment:downloadURL}
            const landPromis = setDoc(dataRef,landData)   
            
            toast.promise(landPromis,{
                loading:"Data saving",
                success:"data saved",
                error:'Some error in saving data Be patient!'
            })
            
            toast.success('Farmer land data uploaded successfully.')
            setData(sendData)
            setDataSubmited(true)
            // navigate('/')

        } catch (error) {
                console.log(error)
                toast.error('problem in saving farmer details')
        }


    }
    const handleChange = (e)=>{
            
            if(e.target.name=='villageCode'){
                console.log("here")
                const result = villageCodeList.find((village)=>village.code==e.target.value)
                console.log(result)                
                formik.setFieldValue('villageCode',result)
            }
        }
                
    if(dataSubmited){
        return (<DataView data={data}/>)
    }
        
    return (
        <section className='form'>
            <h3>Add form for data</h3>
            <form action="" onSubmit={formik.handleSubmit}>

                <div className="input-group">

                <label htmlFor="">Registration Id</label>
                <input type="text"  disabled name="registrationId" value={formik.values.registrationId}  onBlur={formik.handleBlur}  onChange={formik.handleChange}/>
                <Error touched={formik.touched} errors={formik.errors} fieldName="registrationId"/>

                </div>

                <div className="input-group">
                <label htmlFor="farmer_name">Farmer Name</label>
                <input type="text" name="farmerName" value={formik.values.farmerName} onBlur={formik.handleBlur}  onChange={formik.handleChange} />
                <Error touched={formik.touched} errors={formik.errors} fieldName="farmerName"/>
                </div>
                <div className="input-group">
                <label htmlFor="">Farmer Father Name</label>
                <input type="text"  name="fatherName" onBlur={formik.handleBlur}  onChange={formik.handleChange}/>
                <Error touched={formik.touched} errors={formik.errors} fieldName="fatherName"/>

                </div>

                <div className="input-group">
                    <label htmlFor="">Select Village</label>
                    <select name="villageCode" id=""   onChange={handleChange}>
                    {villageCodeList.map((village,index)=>{
                        return (<option key={index} value={village.code}>{village.name}</option> )
                    })}
                    </select>
                    <Error touched={formik.touched} errors={formik.errors} fieldName="villageCode"/>
                    
                </div>


                <div className="input-group">
                     <label htmlFor="">Land Transfer Method</label>
                    <select name="typeOfMutation" id="typeOfMutation" value={formik.values.typeOfMutation} onBlur={formik.handleBlur}  onChange={formik.handleChange}>
                        <option value="1">Death of Husband</option>
                        <option value="2">Death of Father</option>
                        <option value="3">Ancester Land (Virasat)</option>
                        <option value="4">Purchase of Land</option>
                        <option value="5">Gifted</option>
                        <option value="6">Land Grant Allotment</option>
                    </select>
                    <Error touched={formik.touched} errors={formik.errors} fieldName="typeOfMutation"/>
                
                </div>     

                <div className="input-group">
                <label htmlFor="">Date of Mutation</label>
                <input type="date" name="dateOfMutation" id="DateOfMutation" onBlur={formik.handleBlur}  onChange={formik.handleChange}/>
                <Error touched={formik.touched} errors={formik.errors} fieldName="dateOfMutation"/>
                
                </div>     
                <div className="input-group">
                    <label htmlFor="LandOwnershipType">Land Ownership Type</label>
                    <div className='radioGroup'>
                        <label htmlFor="landOwnershipType">
                            <input type="radio" name="landOwnershipType" checked={formik.values.landOwnershipType=="1"} value="1" onChange={formik.handleChange} />
                            <i>SINGLE</i>
                        </label>
                        <label htmlFor="landOwnershipType">
                            <input type="radio" name="landOwnershipType"  value="2" checked={formik.values.landOwnershipType=="2"} onChange={formik.handleChange} />
                            <i>JOINT</i>
                        </label>
                    </div>
                
                </div>
                <div className="input-group">
                    <label htmlFor="">Land Account (Khata no)</label>
                    <input type="text"  name="landAccount" value={formik.values.landAccount}  onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    <Error touched={formik.touched} errors={formik.errors} fieldName="landAccount"/>
                
                </div>         
                <div className="input-group">
                    <label htmlFor="">Land Id (Khasra No)</label>
                    <input type="text"  name="landId"  value={formik.values.landId}  onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.touched.landId && formik.errors.landId ? <div className='error'>{formik.errors.landId}</div> : null}
                
                </div>
                <div className="input-group">
                    <label htmlFor="">LandTransferDoneBefore01022019</label>
                    <select name="landTransferDoneBefore01022019" id="" onBlur={formik.handleBlur} value={formik.values.landTransferDoneBefore01022019}  onChange={formik.handleChange}>
                        <option value="1">Before</option>
                        <option value="2">After</option>
                    </select>
                
                </div>
                <div className="input-group">
                    <label htmlFor="">Land Area</label>
                    <input type="text" name="landArea" id="" onBlur={formik.handleBlur}  onChange={formik.handleChange} />
                    {formik.touched.landArea && formik.errors.landArea ? <div className='error'>{formik.errors.landArea}</div> : null}
                </div>     
            <FileUploader {...{downloadURL,setDownloadURL}}/>
                <button type="submit">Submit</button>

            
            </form>

           

                    
            
        </section>
    )
}

function Error({touched,errors,fieldName}) {
    console.log(errors)
    let errorMessage = null
    if(touched[fieldName] && errors[fieldName]){
        if(typeof errors[fieldName]=="object"){
            const key = Object.keys(errors[fieldName])[0]
            errorMessage = errors[fieldName][key]
        }else{
            errorMessage = errors[fieldName]
        }
    }
    return ( 
        <div className="error" style={!errorMessage?{display:'none'}:null}>
                {errorMessage}
        </div>
     );
}



const AddData  = ()=>{
    const [state,setState] = useState(false)
    const [regId,setRegId] = useState("")

    const validationSchema = Yup.object({
        registrationId: Yup.string().matches(/^RJ\d{8}$/,"Registration id is not in valid formate RJ_______ (8 digit)").required("registration is required"),
    })

        
    const formik = useFormik({
        initialValues:{
            registrationId:""
        },
        validationSchema,
        onSubmit:(values,{resetForm})=>{
            handleSubmit(values)
            resetForm()
            // console.log(values)
        },
    })
    
    



    const handleSubmit = async(values)=>{
        // e.preventDefault()
        if(values.registrationId!==""){
            const toastId = toast.loading('Loading...');
            try {
                const q = query(collection(db, "landData"), where("registrationId", "==", values.registrationId));
                const queryFetch = await getDocs(q);
                const landEntry = await queryFetch.docs.map((doc)=>doc.data())[0]

                 
                    if(landEntry){
                        toast.error("registrationId no is already used")
                        toast.dismiss(toastId)
                        setRegId("")
                        return null
                    }else{
                        setState(true)
                        setRegId(values.registrationId)
                        toast.success("Now you can enter details for this reg id")
                    }
                 toast.dismiss(toastId)   
                
            } catch (error) {
              console.log(error)   
            }
        }
        

    }
    


    if(state){
        return <AddDataNext regId={regId}/>
    }
    return (
        <div className="form">
        
            <form action="" onSubmit={formik.handleSubmit}>
                <div className="input-group">
                    <label htmlFor="">Registeration No</label>
                    <input type="text"  name="registrationId" value={formik.values.registrationId} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
                    <Error touched={formik.touched} errors={formik.errors} fieldName="registrationId"/>
                    <button type="submit">Next</button>

                </div>
            </form>
        </div>
    )
    
}


const DataView = ({data})=>{

    useEffect(()=>{
        console.log("data",data)
    },[])
    return(
        <div className="dataView">
            <div className="hero">
                <h1>You Data is Saved Successfully.</h1>
                <p>Your data further processed and will be sent to pmkisan offical portal.</p>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Field</th>
                        <th>Details</th>
                    </tr>
                </thead>
            
                <tbody>
                        <tr>
                        <td>Registration Id</td> <td>{data.registrationId}</td>
                        </tr>
                        <tr>
                        <td>Farmer Name</td> <td>{data.farmerName}</td>
                        </tr>
                        <tr>
                        <td>Father/Husband Name</td> <td>{data.fatherName}</td>
                        </tr>
                        <tr>
                        <td>Land Account No.(खाता संख्या)</td><td>{data.landAccount}</td>
                        </tr>
                        <tr>
                        <td> Land Id (खसरा न. )</td> <td>{data.landId}</td>
                        </tr>
                        <tr>
                        <td> Land Area (रकबा)</td> <td>{data.landArea}</td>
                        </tr>
                        <tr>
                        <td> Village </td> <td>{data.villageCode.name}</td>
                        </tr>
                        <tr>
                        <td>Download</td> <td className='success'> {data.attechment && <a href={data.attechment} target="_blank">Download</a>}</td>
                        </tr>
                </tbody>
            </table>

        </div>
                    


                   
                    
                    
                    
        
          

        
        
    )
}
export default AddData