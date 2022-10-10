class SocketHelper {    
    startServer(server){
        const io = require('socket.io')(server, {
            cors: {
                origin: "*"
            }
        })
        io.on("connection", (socket)=>{
            console.log("User Entered");
            socket.on("enter", (data) => socket.id = data);
            socket.on("jobs", (data) => {
                socket.broadcast.emit("jobs",data)
            });
        })
    }
}




module.exports = SocketHelper