const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 3000;
var cors = require('cors')
const WebSocket = require('ws');

const sequelizeCrud = require('express-crud-router-sequelize-v6-connector/lib/index')

const expressCrudRouter = require('express-crud-router/lib/index')

const server = require('http').createServer(app)

const wss = new WebSocket.Server({ server: server })

app.use(cors())
app.use(bodyParser.json());
app.use(express.static('root')); 

app.use("/storage", express.static("storage")); 
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
const feedRoutes = require('./routes/feeds');
const quoteRoutes = require('./routes/quotes');

app.use(expressCrudRouter.crud('/addresses', sequelizeCrud.default(models.Addresses)))
app.use(expressCrudRouter.crud('/services', sequelizeCrud.default(models.Services)))
app.use(expressCrudRouter.crud('/services_type', sequelizeCrud.default(models.ServiceTypes)))
app.use(expressCrudRouter.crud('/job_quotes', sequelizeCrud.default(models.JobQuotes)))
app.use(expressCrudRouter.crud('/homescreen_sections', sequelizeCrud.default(models.HomescreenSections)))

app.use('/users',userRoutes)
app.use('/settings',appSettingRoutes)
app.use('/feeds',feedRoutes)

app.use('/jobs',jobRoutes)
app.use('/quotes',quoteRoutes)


wss.on('listening', () => {
  console.log('listening on ')
})

server.listen(PORT, () => {
  console.log(`Server started on port ${server.address().port}`);
});
