var DataTypes = require("sequelize").DataTypes;
var _Addresses = require("./addresses");
var _Cities = require("./cities");
var _ContractorServices = require("./contractor_services");
var _Contractors = require("./contractors");
var _Contracts = require("./contracts");
var _Countries = require("./countries");
var _FavouriteContractors = require("./favourite_contractors");
var _FavouriteWorkers = require("./favourite_workers");
var _HomescreenSections = require("./homescreen_sections");
var _JobAssigned = require("./job_assigned");
var _JobAssignedStatus = require("./job_assigned_status");
var _JobAttachments = require("./job_attachments");
var _JobDetails = require("./job_details");
var _JobQuoteStatus = require("./job_quote_status");
var _JobQuotes = require("./job_quotes");
var _JobStatus = require("./job_status");
var _Jobs = require("./jobs");
var _Ratings = require("./ratings");
var _Roles = require("./roles");
var _ServiceCategories = require("./service_categories");
var _ServiceTypes = require("./service_types");
var _Services = require("./services");
var _Settings = require("./settings");
var _States = require("./states");
var _Users = require("./users");
var _WorkerServices = require("./worker_services");
var _Workers = require("./workers");

function initModels() {
  const sequelize = require("../config/database");
  var Addresses = _Addresses(sequelize, DataTypes);
  var Cities = _Cities(sequelize, DataTypes);
  var ContractorServices = _ContractorServices(sequelize, DataTypes);
  var Contractors = _Contractors(sequelize, DataTypes);
  var Contracts = _Contracts(sequelize, DataTypes);
  var Countries = _Countries(sequelize, DataTypes);
  var FavouriteContractors = _FavouriteContractors(sequelize, DataTypes);
  var FavouriteWorkers = _FavouriteWorkers(sequelize, DataTypes);
  var HomescreenSections = _HomescreenSections(sequelize, DataTypes);
  var JobAssigned = _JobAssigned(sequelize, DataTypes);
  var JobAssignedStatus = _JobAssignedStatus(sequelize, DataTypes);
  var JobAttachments = _JobAttachments(sequelize, DataTypes);
  var JobDetails = _JobDetails(sequelize, DataTypes);
  var JobQuoteStatus = _JobQuoteStatus(sequelize, DataTypes);
  var JobQuotes = _JobQuotes(sequelize, DataTypes);
  var JobStatus = _JobStatus(sequelize, DataTypes);
  var Jobs = _Jobs(sequelize, DataTypes);
  var Ratings = _Ratings(sequelize, DataTypes);
  var Roles = _Roles(sequelize, DataTypes);
  var ServiceCategories = _ServiceCategories(sequelize, DataTypes);
  var ServiceTypes = _ServiceTypes(sequelize, DataTypes);
  var Services = _Services(sequelize, DataTypes);
  var Settings = _Settings(sequelize, DataTypes);
  var States = _States(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);
  var WorkerServices = _WorkerServices(sequelize, DataTypes);
  var Workers = _Workers(sequelize, DataTypes);

  JobDetails.belongsTo(Addresses, { as: "address", foreignKey: "addressId"});
  Addresses.hasMany(JobDetails, { as: "jobDetails", foreignKey: "addressId"});
  ContractorServices.belongsTo(Contractors, { as: "contractor", foreignKey: "contractorId"});
  Contractors.hasMany(ContractorServices, { as: "contractorServices", foreignKey: "contractorId"});
  FavouriteContractors.belongsTo(Contractors, { as: "contractor", foreignKey: "contractorId"});
  Contractors.hasMany(FavouriteContractors, { as: "favouriteContractors", foreignKey: "contractorId"});
  Ratings.belongsTo(Contractors, { as: "contractor", foreignKey: "contractorId"});
  Contractors.hasMany(Ratings, { as: "ratings", foreignKey: "contractorId"});
  Workers.belongsTo(Contractors, { as: "contactor", foreignKey: "contactorId"});
  Contractors.hasMany(Workers, { as: "workers", foreignKey: "contactorId"});
  Cities.belongsTo(Countries, { as: "country", foreignKey: "countryId"});
  Countries.hasMany(Cities, { as: "cities", foreignKey: "countryId"});
  States.belongsTo(Countries, { as: "country", foreignKey: "countryId"});
  Countries.hasMany(States, { as: "states", foreignKey: "countryId"});
  JobAssigned.belongsTo(JobAssignedStatus, { as: "status", foreignKey: "statusId"});
  JobAssignedStatus.hasMany(JobAssigned, { as: "jobAssigneds", foreignKey: "statusId"});
  JobQuotes.belongsTo(JobQuoteStatus, { as: "status", foreignKey: "statusId"});
  JobQuoteStatus.hasMany(JobQuotes, { as: "jobQuotes", foreignKey: "statusId"});
  Jobs.belongsTo(JobStatus, { as: "status", foreignKey: "statusId"});
  JobStatus.hasMany(Jobs, { as: "jobs", foreignKey: "statusId"});
  JobAssigned.belongsTo(Jobs, { as: "job", foreignKey: "jobId"});
  Jobs.hasMany(JobAssigned, { as: "jobAssigneds", foreignKey: "jobId"});
  JobAttachments.belongsTo(Jobs, { as: "job", foreignKey: "jobId"});
  Jobs.hasMany(JobAttachments, { as: "jobAttachments", foreignKey: "jobId"});
  JobDetails.belongsTo(Jobs, { as: "job", foreignKey: "jobId"});
  Jobs.hasMany(JobDetails, { as: "jobDetails", foreignKey: "jobId"});
  JobQuotes.belongsTo(Jobs, { as: "job", foreignKey: "jobId"});
  Jobs.hasMany(JobQuotes, { as: "jobQuotes", foreignKey: "jobId"});
  Ratings.belongsTo(Jobs, { as: "job", foreignKey: "jobId"});
  Jobs.hasMany(Ratings, { as: "ratings", foreignKey: "jobId"});
  Users.belongsTo(Roles, { as: "role", foreignKey: "roleId"});
  Roles.hasMany(Users, { as: "users", foreignKey: "roleId"});
  Services.belongsTo(ServiceCategories, { as: "serviceCategory", foreignKey: "serviceCategoryId"});
  ServiceCategories.hasMany(Services, { as: "services", foreignKey: "serviceCategoryId"});
  Services.belongsTo(ServiceTypes, { as: "serviceType", foreignKey: "serviceTypeId"});
  ServiceTypes.hasMany(Services, { as: "services", foreignKey: "serviceTypeId"});
  ContractorServices.belongsTo(Services, { as: "service", foreignKey: "serviceId"});
  Services.hasMany(ContractorServices, { as: "contractorServices", foreignKey: "serviceId"});
  Jobs.belongsTo(Services, { as: "service", foreignKey: "serviceId"});
  Services.hasMany(Jobs, { as: "jobs", foreignKey: "serviceId"});
  WorkerServices.belongsTo(Services, { as: "service", foreignKey: "serviceId"});
  Services.hasMany(WorkerServices, { as: "workerServices", foreignKey: "serviceId"});
  Cities.belongsTo(States, { as: "state", foreignKey: "stateId"});
  States.hasMany(Cities, { as: "cities", foreignKey: "stateId"});
  FavouriteContractors.belongsTo(Users, { as: "user", foreignKey: "userId"});
  Users.hasMany(FavouriteContractors, { as: "favouriteContractors", foreignKey: "userId"});
  FavouriteWorkers.belongsTo(Users, { as: "user", foreignKey: "userId"});
  Users.hasMany(FavouriteWorkers, { as: "favouriteWorkers", foreignKey: "userId"});
  Jobs.belongsTo(Users, { as: "user", foreignKey: "userId"});
  Users.hasMany(Jobs, { as: "jobs", foreignKey: "userId"});
  Ratings.belongsTo(Users, { as: "user", foreignKey: "userId"});
  Users.hasMany(Ratings, { as: "ratings", foreignKey: "userId"});
  FavouriteWorkers.belongsTo(Workers, { as: "worker", foreignKey: "workerId"});
  Workers.hasMany(FavouriteWorkers, { as: "favouriteWorkers", foreignKey: "workerId"});
  JobQuotes.belongsTo(Workers, { as: "quoter", foreignKey: "quoterId"});
  Workers.hasMany(JobQuotes, { as: "jobQuotes", foreignKey: "quoterId"});
  Ratings.belongsTo(Workers, { as: "worker", foreignKey: "workerId"});
  Workers.hasMany(Ratings, { as: "ratings", foreignKey: "workerId"});
  WorkerServices.belongsTo(Workers, { as: "worker", foreignKey: "workerId"});
  Workers.hasMany(WorkerServices, { as: "workerServices", foreignKey: "workerId"});

  return {
    Addresses,
    Cities,
    ContractorServices,
    Contractors,
    Contracts,
    Countries,
    FavouriteContractors,
    FavouriteWorkers,
    HomescreenSections,
    JobAssigned,
    JobAssignedStatus,
    JobAttachments,
    JobDetails,
    JobQuoteStatus,
    JobQuotes,
    JobStatus,
    Jobs,
    Ratings,
    Roles,
    ServiceCategories,
    ServiceTypes,
    Services,
    Settings,
    States,
    Users,
    WorkerServices,
    Workers,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
