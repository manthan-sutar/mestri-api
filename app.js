const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT;
var cors = require('cors')

const SocketHelper = require('./helpers/SocketHelper')

const socketHelper = new SocketHelper();

const server = require('http').createServer(app)


app.use(cors())
app.use(bodyParser.json());
app.use(express.static('storage'))
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res)=>{
    res.send("API")
})

const userRoutes = require('./routes/users')
const appSettingRoutes = require('./routes/app_settings')

app.use('/users',userRoutes)
app.use('/settings',appSettingRoutes)

server.listen(PORT, () => {
    console.log("Server Running on port "+PORT)
    socketHelper.startServer()
})

// io.on("connection", (socket)=>{
//     console.log("new user Entered")

//     // socket.on("signal", (data)=>{
//     //     socket.broadcast.emit("signal",data)
//     // })
    
//     // socket.on("users_private_signal", (data) => {
//     //     console.log(data);
//     //     socket.to(data.client_id).emit("users_private_signal", data.signal);
//     // })

//     // socket.on("new_order", (data) => {
//     //     console.log("NEW ORDER");
//     //     socket.to(data.client_id).emit("new_order", data.order);
//     // })
// })

