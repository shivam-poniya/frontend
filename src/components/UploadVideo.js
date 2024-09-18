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
    <div className='flex relative mx-4 py-4'>
        <div className='absolute right-0 '>
        <input type='file' accept='video/*' onChange={handleChange}></input>
        <button className='bg-blue-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full' onClick={handleUpload} disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload'}
        </button>
        {uploading && <progress value={progress} max="100"></progress>}
        </div>
    </div>
  )
}
