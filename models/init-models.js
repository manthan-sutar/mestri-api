var DataTypes = require("sequelize").DataTypes;
var _Addresses = require("./addresses");
var _BookingAttachments = require("./booking_attachments");
var _BookingDetails = require("./booking_details");
var _BookingQuotes = require("./booking_quotes");
var _Bookings = require("./bookings");
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
  var BookingAttachments = _BookingAttachments(sequelize, DataTypes);
  var BookingDetails = _BookingDetails(sequelize, DataTypes);
  var BookingQuotes = _BookingQuotes(sequelize, DataTypes);
  var Bookings = _Bookings(sequelize, DataTypes);
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

  JobDetails.belongsTo(Addresses, { foreignKey: "addressId"});
  Addresses.hasMany(JobDetails, { foreignKey: "addressId"});
  Bookings.belongsTo(BookingAttachments, { foreignKey: "id"});
  BookingAttachments.hasOne(Bookings, { foreignKey: "id"});
  BookingAttachments.belongsTo(Bookings, { foreignKey: "bookingId"});
  Bookings.hasMany(BookingAttachments, { foreignKey: "bookingId"});
  BookingDetails.belongsTo(Bookings, { foreignKey: "bookingId"});
  Bookings.hasMany(BookingDetails, { foreignKey: "bookingId"});
  ContractorServices.belongsTo(Contractors, { foreignKey: "contractorId"});
  Contractors.hasMany(ContractorServices, { foreignKey: "contractorId"});
  FavouriteContractors.belongsTo(Contractors, { foreignKey: "contractorId"});
  Contractors.hasMany(FavouriteContractors, { foreignKey: "contractorId"});
  Ratings.belongsTo(Contractors, { foreignKey: "contractorId"});
  Contractors.hasMany(Ratings, { foreignKey: "contractorId"});
  Workers.belongsTo(Contractors, { foreignKey: "contactorId"});
  Contractors.hasMany(Workers, { foreignKey: "contactorId"});
  Cities.belongsTo(Countries, { foreignKey: "countryId"});
  Countries.hasMany(Cities, { foreignKey: "countryId"});
  States.belongsTo(Countries, { foreignKey: "countryId"});
  Countries.hasMany(States, { foreignKey: "countryId"});
  JobAssigned.belongsTo(JobAssignedStatus, { foreignKey: "statusId"});
  JobAssignedStatus.hasMany(JobAssigned, { foreignKey: "statusId"});
  JobQuotes.belongsTo(JobQuoteStatus, { foreignKey: "statusId"});
  JobQuoteStatus.hasMany(JobQuotes, { foreignKey: "statusId"});
  Jobs.belongsTo(JobStatus, { foreignKey: "statusId"});
  JobStatus.hasMany(Jobs, { foreignKey: "statusId"});
  JobAssigned.belongsTo(Jobs, { foreignKey: "jobId"});
  Jobs.hasMany(JobAssigned, { foreignKey: "jobId"});
  JobAttachments.belongsTo(Jobs, { foreignKey: "jobId"});
  Jobs.hasMany(JobAttachments, { foreignKey: "jobId"});
  JobDetails.belongsTo(Jobs, { foreignKey: "jobId"});
  Jobs.hasMany(JobDetails, { foreignKey: "jobId"});
  JobQuotes.belongsTo(Jobs, { foreignKey: "jobId"});
  Jobs.hasMany(JobQuotes, { foreignKey: "jobId"});
  Ratings.belongsTo(Jobs, { foreignKey: "jobId"});
  Jobs.hasMany(Ratings, { foreignKey: "jobId"});
  Users.belongsTo(Roles, { foreignKey: "roleId"});
  Roles.hasMany(Users, { foreignKey: "roleId"});
  Services.belongsTo(ServiceCategories, { foreignKey: "serviceCategoryId"});
  ServiceCategories.hasMany(Services, { foreignKey: "serviceCategoryId"});
  Services.belongsTo(ServiceTypes, { foreignKey: "serviceTypeId"});
  ServiceTypes.hasMany(Services, { foreignKey: "serviceTypeId"});
  ContractorServices.belongsTo(Services, { foreignKey: "serviceId"});
  Services.hasMany(ContractorServices, { foreignKey: "serviceId"});
  Jobs.belongsTo(Services, { foreignKey: "serviceId"});
  Services.hasMany(Jobs, { foreignKey: "serviceId"});
  WorkerServices.belongsTo(Services, { foreignKey: "serviceId"});
  Services.hasMany(WorkerServices, { foreignKey: "serviceId"});
  Cities.belongsTo(States, { foreignKey: "stateId"});
  States.hasMany(Cities, { foreignKey: "stateId"});
  FavouriteContractors.belongsTo(Users, { foreignKey: "userId"});
  Users.hasMany(FavouriteContractors, { foreignKey: "userId"});
  FavouriteWorkers.belongsTo(Users, { foreignKey: "userId"});
  Users.hasMany(FavouriteWorkers, { foreignKey: "userId"});
  Jobs.belongsTo(Users, { foreignKey: "userId"});
  Users.hasMany(Jobs, { foreignKey: "userId"});
  Ratings.belongsTo(Users, { foreignKey: "userId"});
  Users.hasMany(Ratings, { foreignKey: "userId"});
  FavouriteWorkers.belongsTo(Workers, { foreignKey: "workerId"});
  Workers.hasMany(FavouriteWorkers, { foreignKey: "workerId"});
  JobQuotes.belongsTo(Workers, { foreignKey: "quoterId"});
  Workers.hasMany(JobQuotes, { foreignKey: "quoterId"});
  Ratings.belongsTo(Workers, { foreignKey: "workerId"});
  Workers.hasMany(Ratings, { foreignKey: "workerId"});
  WorkerServices.belongsTo(Workers, { foreignKey: "workerId"});
  Workers.hasMany(WorkerServices, { foreignKey: "workerId"});

  return {
    Addresses,
    BookingAttachments,
    BookingDetails,
    BookingQuotes,
    Bookings,
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
