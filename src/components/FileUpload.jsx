import React, { useRef, useState } from 'react';
// import firebase from 'firebase/app';
import { app } from '../firebase-config';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { toast } from 'react-hot-toast';


const MAX_FILE_SIZE = 100 * 1024; // 100 KB in bytes

function FileUploader({downloadURL,setDownloadURL}) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const fileinputRef = useRef(null)

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError('File size must be less than 100 KB');
    } else {
      setFile(selectedFile);
      setError(null);
    }
  }

  function handleFileUpload() {
    if (!file) {
      setError('Please select a file to upload');
      return;
    }
    console.log(file)
    const fileName = file.name
    const storage = getStorage();
    const storageRef = ref(storage,"pdf/"+fileName);
    const myPromise = uploadBytes(storageRef,file).then((snapshot)=>{
        // setDownloadURL(getDownloadURL(storageRef));  
        getDownloadURL(storageRef).then((url)=>{
            setDownloadURL(url)
        })
        setFile(null)
        fileinputRef.current.value = null
        

    })

    toast.promise(myPromise, {
        loading: 'Uploading',
        success: 'Upload Successful',
        error: 'Error when uploading',
      });

    // fileRef.put(file).then(snapshot => {
    //   setDownloadURL(snapshot.ref.getDownloadURL());
    // });
  }

  const isActive = downloadURL?" active":""
  return (
    <div className='input-group '>
      <label htmlFor="">fileUpload :</label>
      <div className='upload-section'>
      <input type="file" ref={fileinputRef} onChange={handleFileChange} accept="application/pdf" />
      <button  type="button" className="upload-button" onClick={handleFileUpload}>Upload</button>
      <div className={"download-section"+isActive}>
        {downloadURL && <a href={downloadURL} target="_blank">View file</a>}
      </div>

      </div>

      {error && <p>{error}</p>}
    </div>
  );
}

export default FileUploader;
