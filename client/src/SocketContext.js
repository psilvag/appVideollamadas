
 import React, {createContext, useRef, useState, useEffect, Children} from 'react'
 import {io} from 'socket.io-client'
 import Peer from 'simple-peer'

 
 const SocketContext=createContext()
 const socket=io('http://127.0.0.1:5000')

 const ContextProvider=({children})=>{

   const[stream,setStream]=useState(null)
   const[me,setMe]=useState('')
   const[call,setCall]=useState({})
   const[callAccepted,setCallAccepted]=useState(false)
   const[callEnded,sertCallEnded]=useState(false)
   const[name,setName]=useState('')

   const myVideo=useRef()
   const userVideo=useRef()
   const connectionRef=useRef()

   useEffect(()=>{
        navigator.mediaDevices.getUserMedia({video:true,audio:true})
        .then((currentStream)=>{
            setStream(currentStream)
            myVideo.current.srcObject=currentStream
        })
        socket.on('me',(id)=>setMe(id))
        socket.on('calluser',({from,signal,name:callerName})=>{
            setCall({isRecivedCall:true,from,name:callerName,signal})
        })
   },[])

     const callUser=(id)=>{
        const peer= new Peer({initiator:true,trickle:false,stream})

        peer.on('signal',(data)=>{
            socket.emit('calluser',{userToCall:id,signalData:data,from:me,name})
        })
        peer.on('stream',(currentStream)=>{
            userVideo.current.srcObject=currentStream
        })

        socket.emit('callaccepted',(signal)=>{
            setCallAccepted(true)
            peer.signal(signal)
        })

        connectionRef.current=peer
     }

     const answerCall=()=>{
        const peer= new Peer({initiator:false,trickle:false,stream})

        peer.on('signal',(data)=>{
            socket.emit('answercall',{signal:data,to:call.from})
        })
        peer.on('stream',(currentStream)=>{
            userVideo.current.srcObject=currentStream
        })
        peer.signal(call.signal)

        connectionRef.current=peer

   
     }

     const leaveCall=()=>{
        sertCallEnded(true)
        connectionRef.current.destroy() 

        // reload():recarga la pagina y asigna un nuevo id al usuario para iniciar una nueva llamada
        window.location.reload()
     }

     return (
        <SocketContext.Provider value={{
            stream,
            me,
            call,
            callAccepted,
            callEnded,
            name,
            setName,
            myVideo,
            userVideo,
            callUser,
            answerCall,
            leaveCall,

        }}>
        {children}
        </SocketContext.Provider>
     )

 }

 export {ContextProvider,SocketContext}

