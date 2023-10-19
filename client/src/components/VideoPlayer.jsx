import React, { useContext } from 'react'
import { SocketContext } from '../SocketContext'


const VideoPlayer = () => {
  const{name,callAccepted,myVideo,userVideo,callEnded,stream,call}=useContext(SocketContext)


  return (
    <div>VideoPlayer</div>
  )
}

export default VideoPlayer