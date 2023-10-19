import React, { useContext } from 'react'
import { SocketContext } from '../SocketContext'
import '../styles/videoPlayerStyles.css'

const VideoPlayer = () => {
  const{name,callAccepted,myVideo,userVideo,callEnded,stream,call}=useContext(SocketContext)


  return (
    <div className='container-video'>
      { stream && (
      <div className='container-myvideo'>
        <video ref={myVideo} playsInline muted autoPlay className='video-myvideo'/>
        <h3>{name||'Name'}</h3>
      </div>
      )}
       {callAccepted && !callEnded &&(
      <div className='container-uservideo'>
      <video ref={userVideo} playsInline muted autoPlay className='video-uservideo'/>
      <h3>{call.name || 'userName'}</h3>
      </div>
      )}
    </div>
  )
}

export default VideoPlayer