var DataTypes = require("sequelize").DataTypes;
var _Addresses = require("./addresses");
var _Contractors = require("./contractors");
var _Contracts = require("./contracts");
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
var _Users = require("./users");

function initModels() {
  const sequelize = require("../config/database");

  var Addresses = _Addresses(sequelize, DataTypes);
  var Contractors = _Contractors(sequelize, DataTypes);
  var Contracts = _Contracts(sequelize, DataTypes);
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
  var Users = _Users(sequelize, DataTypes);

  JobDetails.belongsTo(Addresses, { foreignKey: "addressId"});
  Addresses.hasMany(JobDetails, { foreignKey: "addressId"});
  Ratings.belongsTo(Contractors, { foreignKey: "contractorId"});
  Contractors.hasMany(Ratings, { foreignKey: "contractorId"});
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
  Jobs.belongsTo(Services, { foreignKey: "serviceId"});
  Services.hasMany(Jobs, { foreignKey: "serviceId"});
  JobQuotes.belongsTo(Users, { foreignKey: "quoterId"});
  Users.hasMany(JobQuotes, { foreignKey: "quoterId"});
  Jobs.belongsTo(Users, { foreignKey: "userId"});
  Users.hasMany(Jobs, { foreignKey: "userId"});
  Ratings.belongsTo(Users, { foreignKey: "userId"});
  Users.hasMany(Ratings, { foreignKey: "userId"});

  return {
    Addresses,
    Contractors,
    Contracts,
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
    Users,
  };
}


module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
