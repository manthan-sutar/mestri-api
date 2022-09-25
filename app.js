const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8081;
var cors = require('cors')

const SocketHelper = require('./helpers/SocketHelper')

const sequelizeCrud = require('express-crud-router-sequelize-v6-connector/lib/index')

const expressCrudRouter = require('express-crud-router/lib/index')

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

var initModels = require("./models/init-models");
var models = initModels();


app.get('/', (req, res)=>{
    res.send("API")
})

const userRoutes = require('./routes/users')
const appSettingRoutes = require('./routes/app_settings')
const jobRoutes = require('./routes/jobs');

app.use(expressCrudRouter.crud('/addresses', sequelizeCrud.default(models.Addresses)))
app.use(expressCrudRouter.crud('/services', sequelizeCrud.default(models.Services)))
app.use(expressCrudRouter.crud('/services_type', sequelizeCrud.default(models.ServiceTypes)))
app.use('/users',userRoutes)
app.use('/settings',appSettingRoutes)

app.use('/jobs',jobRoutes)

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

