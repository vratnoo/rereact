import { async } from '@firebase/util';
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase-config';
const ViewData  = ()=>{
    const [landData,setLandData] = useState([])
    useEffect(() => {
        const userId = auth.currentUser.uid
        const fetchData = async()=>{
            const q = query(collection(db, "landData"), where("uid", "==", userId));
            const queryFetch = await getDocs(q);
            const result = await queryFetch.docs.map((doc)=>doc.data())
            console.log(result)
            setLandData(result)
        }
        fetchData()
        console.log("landData",landData)
    }, []);


    return (
        <div className="table_wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Registration Id</th>
                        <th>Farmer Name</th>
                        <th>Father Name</th>
                        <th>Land owner Id ( Khata No)</th>
                        <th>Land Id (Khasra No)</th>
                        <th>AttechMent</th>
                    </tr>
                </thead>
                <tbody>
                        {landData.map((data)=>{
                            return (
                                <tr>
                            
                                <td>{data.registrationId}</td>
                                <td>{data.farmerName}</td>
                                <td>{data.fatherName}</td>
                                <td>{data.landAccount}</td>
                                <td>{data.landId}</td>
                                <td> {data.attechment && <a href={data.attechment} style={{color:"green"}} target="_blank">Download</a>}</td>
                        
                            </tr>
                            )
                  
                        })}
                        
                        
                </tbody>
            </table>
        </div>
    )
}

export default ViewData