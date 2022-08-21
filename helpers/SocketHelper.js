class SocketHelper {
    startServer(server){
        const io = require('socket.io')(server, {
            cors: {
                origin: "*"
            }
        })

        io.on("connection", (socket)=>{
            console.log("new user Entered")
        })
    }
}

module.exports = SocketHelper