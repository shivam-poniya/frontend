import axios from 'axios';
import React, { useState } from 'react'

export const UploadVideo = () => {

    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleChange = (e)=>{
        setFile(e.target.files[0]);
    }

    const handleUpload = async ()=>{
        if(!file) return;
        setUploading(true);

        const formData = new FormData();
        formData.append('file', file);

        try{
            const response = await axios.post('http://localhost:8000/api/videos/upload', formData, {onUploadProgress: (event) =>{
                if(event.lengthComputable){
                    setProgress(Math.round((event.loaded / event.total) * 100));
                }
            },} );
            console.log('Upload successful:', response);
        }catch(error){
            console.error('Error:', error);
        }finally{
            setUploading(false);
        }
    }

  return (
    <div>
        <input type='file' accept='video/*' onChange={handleChange}></input>
        <button onClick={handleUpload} disabled={uploading}>
            {uploading ? 'uploading...' : 'upload'}
        </button>
        {uploading && <progress value={progress} max="100"></progress>}
    </div>
  )
}
