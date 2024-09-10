import { useEffect, useState } from "react";
import axios from "axios";
import './VideoList.css';


export const VideoList = () =>{
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() =>{
        const fetchVideos = async ()=>{
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8000/api/videos/');
                setVideos(response.data);                
            } catch (error) {
                setError('Failed to fetch videos...')
            }finally{
                setLoading(false);
            }
        };
        fetchVideos();
    }, []);

    const handleSelectedVideo = (video)=>{
        setSelectedVideo(video)
    }
    if(loading) return <p>Loading Videos...</p>
    if(error) return <p>{error}</p>

    return(
        <div>
            <h1>Videos List</h1>
            <div className="video-list">
                {videos.length > 0 ? (
                    videos.map((video) => (
                        <div key={video.id} className="video-item">
                            <p>{video.filename}</p>
                            <button onClick={() => {handleSelectedVideo(video)}}>Play Video</button>
                        </div>
                    ))
                ): (
                    <p>No Videos to Play...</p>
                )}
            </div>
            {/* // Temp code to play select video have to redo */}
            {selectedVideo && (
                <div className="video-player">
                    <h2>Now Playing: {selectedVideo.filename}</h2>
                    <video
                        src={`http://localhost:8000/api/videos/${selectedVideo.id}`}
                        controls
                        width="600"
                    ></video>
                </div>
            )}
        </div>
        
    )
}   