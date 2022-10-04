class SocketHelper {    
    startServer(server){
        const io = require('socket.io')(server, {
            cors: {
                origin: "*"
            }
        })

        io.on("connection", (socket)=>{
            socket.on("enter", (data) => socket.id = data);
        })
    }
}


module.exports = SocketHelper