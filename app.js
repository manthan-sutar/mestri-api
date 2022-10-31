const express = require('express');
const bodyParser = require('body-parser');
const SocketHelper = require('./helpers/SocketHelper');
const app = express();
const { Op } = require('sequelize')

const PORT = process.env.PORT || 3000;
var cors = require('cors')

const sequelizeCrud = require('express-crud-router-sequelize-v6-connector/lib/index')

const expressCrudRouter = require('express-crud-router/lib/index')

const server = require('http').createServer(app)


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


app.get('/', (req, res) => {
  res.send("API")
})

const userRoutes = require('./routes/users')
const appSettingRoutes = require('./routes/app_settings')
const jobRoutes = require('./routes/jobs');
const feedRoutes = require('./routes/feeds');
const quoteRoutes = require('./routes/quotes');
const serviceRoutes = require('./routes/service');
const serviceCategoriesRoutes = require('./routes/serviceCategories');
const workerRoutes = require('./routes/worker');
const authRoutes = require('./routes/auth');
// const countryRoutes = require('./routes/countries');


app.use(expressCrudRouter.crud('/addresses', sequelizeCrud.default(models.Addresses)))
app.use(expressCrudRouter.crud('/services', sequelizeCrud.default(models.Services)))
app.use(expressCrudRouter.crud('/services_type', sequelizeCrud.default(models.ServiceTypes)))
app.use(expressCrudRouter.crud('/services_categories', sequelizeCrud.default(models.ServiceCategories)))
app.use(expressCrudRouter.crud('/job_quotes', sequelizeCrud.default(models.JobQuotes)))
app.use(expressCrudRouter.crud('/homescreen_sections', sequelizeCrud.default(models.HomescreenSections)))
app.use(expressCrudRouter.crud('/worker_services', sequelizeCrud.default(models.WorkerServices)))
app.use(expressCrudRouter.crud('/contractor_services', sequelizeCrud.default(models.ContractorServices)))
app.use(expressCrudRouter.crud('/workers', sequelizeCrud.default(models.Workers)))
app.use(expressCrudRouter.crud('/contractors', sequelizeCrud.default(models.Contractors)))
app.use(expressCrudRouter.crud('/states', sequelizeCrud.default(models.States)))
app.use(expressCrudRouter.crud('/countries', sequelizeCrud.default(models.Countries)))
app.use(expressCrudRouter.crud('/cities', sequelizeCrud.default(models.Cities)))


app.use('/users', userRoutes)
app.use('/settings', appSettingRoutes)
app.use('/service', serviceRoutes)
app.use('/feeds', feedRoutes)
app.use('/jobs', jobRoutes)
app.use('/jobs/quotes', quoteRoutes)
app.use('/services_categories/services', serviceCategoriesRoutes)
app.use('/worker', workerRoutes)
app.use('/auth', authRoutes)
// app.use('/countries', countryRoutes)

server.listen(PORT, () => {
  console.log("Server Running on port " + PORT)
})

const socketHelper = new SocketHelper()

socketHelper.startServer(server)
