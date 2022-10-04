class SocketHelper {    
    startServer(server){
        const io = require('socket.io')(server, {
            cors: {
                origin: "*"
            }
        })

        io.on("connection", (socket)=>{
            console.log("User Entered");
            socket.on("enter", (data) => socket.broadcast.emit("enter",data));
        })
    }
}


module.exports = SocketHelper