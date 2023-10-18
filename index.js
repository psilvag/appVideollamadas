
const app= require('express')()
const server=require('http').createServer(app)
const cors =require('cors')


/**
 * Conectamos el servidor websocket de socket.io con el servidor http
 * para que fucionen conjuntamente en la aplicacion
 * origin *: permite cualquier origen y metodos POST Y GET
 */
const io=require('socket.io')(server,{
    cors:{
        origin:'*',
        methods:["GET","POST"]
    }
})

app.use(cors())
const PORT= process.env.PORT|| 5000

app.get('/',(req,res)=>{
    res.send('Server is running.')    
})

/**
 * CONFIGURACION DE LA INTERACCION DE LOS USUARIOS DENTRO DE LA APLICACION
 */

/**
 * io.on: se ejecuta cuando un usuario se conecta a la aplicacion, 
 * socket representa esa nueva conexion
 */
io.on('connection',(socket)=>{
    /**
 * socket.emit: cuando un usuario se conecta se le envia un mensaje que contiene su id del socket, para identificarlo 
 */
    socket.emit('me',socket.id)
/**
 * socket.on: cuando un usuario se desconecta se emite el evento callended que notifica a los demas usuarios que se desconecto
 */
    socket.on('disconnect',()=>{
        socket.broadcast.emit('callended')
    })
/**
 * socket.on('calluser'): cuando se inicia una llamada se envia la info de esa llamada , id del usuario destino, datos de la señal, desde donde y nombre del usuario.
 */
    socket.on('calluser',({userToCall,signalData,from,name})=>{
        io.to(userToCall).emit('calluser',{signal:signalData,from,name})
    })
/**
 * socket.on('answercall'): cuando se responde la llamada entrante se emite el evento answercall que envia los dato de la señal al usuario que inicio la llamada
 */
    socket.on('answercall',(data)=>{
        io.to(data.io).emit('callaccepted',data.signal)
    })

})
app.listen(PORT,()=>{
    console.log(`Server is running by PORT: ${PORT}`)
})
