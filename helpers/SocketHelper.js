class SocketHelper {
    startServer(server){
        const io = require('socket.io')(server, {
            cors: {
                origin: "*"
            }
        })

        io.on("connection", (socket)=>{
            console.log("new user Entered")
            // socket.on("quotes_stream", (data) => {
            //     socket.to(data.client_id).emit("users_private_signal", data.signal);
            // })
        })
    }
}

module.exports = SocketHelper