// var DataTypes = require("sequelize").DataTypes;
// var _Addresses = require("./addresses");
// var _HomescreenSections = require("./homescreen_sections");
// var _JobAssigned = require("./job_assigned");
// var _JobAttachments = require("./job_attachments");
// var _JobDetails = require("./job_details");
// var _JobQuotes = require("./job_quotes");
// var _Jobs = require("./jobs");
// var _Roles = require("./roles");
// var _ServiceTypes = require("./service_types");
// var _Services = require("./services");
// var _Settings = require("./settings");
// var _Users = require("./users");

// function initModels() {
//   const sequelize = require("../config/database");
//   var Addresses = _Addresses(sequelize, DataTypes);
//   var HomescreenSections = _HomescreenSections(sequelize, DataTypes);
//   var JobAssigned = _JobAssigned(sequelize, DataTypes);
//   var JobAttachments = _JobAttachments(sequelize, DataTypes);
//   var JobDetails = _JobDetails(sequelize, DataTypes);
//   var JobQuotes = _JobQuotes(sequelize, DataTypes);
//   var Jobs = _Jobs(sequelize, DataTypes);
//   var Roles = _Roles(sequelize, DataTypes);
//   var ServiceTypes = _ServiceTypes(sequelize, DataTypes);
//   var Services = _Services(sequelize, DataTypes);
//   var Settings = _Settings(sequelize, DataTypes);
//   var Users = _Users(sequelize, DataTypes);


//     ///Job Associations
//     Jobs.belongsTo(Services, {foreignKey: "serviceId"})
//     Services.belongsTo(ServiceTypes,{foreignKey: "serviceTypeId"})
//     Services.belongsTo(ServiceCategories,{foreignKey: "serviceCategoryId"})
//     Jobs.belongsTo(Users, {foreignKey: "userId"})
//     Jobs.belongsTo(JobStatus, {foreignKey: "statusId"})
//     Jobs.hasOne(JobDetails, {foreignKey: "jobId"})
//     Jobs.hasMany(JobAttachments, {foreignKey: "jobId"})
//     Jobs.hasMany(JobQuotes, {foreignKey: "jobId"})
//   return {
//     Addresses,
//     HomescreenSections,
//     JobAssigned,
//     JobAttachments,
//     JobDetails,
//     JobQuotes,
//     Jobs,
//     Roles,
//     ServiceTypes,
//     Services,
//     Settings,
//     Users,
//   };
// }
// module.exports = initModels;
// module.exports.initModels = initModels;
// module.exports.default = initModels;

///Job Associations
Jobs.belongsTo(Services, {foreignKey: "serviceId"})
Jobs.belongsTo(Users, {foreignKey: "userId"})
JobQuotes.belongsTo(Users, {foreignKey: "quoterId"})
Jobs.belongsTo(JobStatus, {foreignKey: "statusId"})
Jobs.hasOne(JobDetails, {foreignKey: "jobId"})
Jobs.hasMany(JobAttachments, {foreignKey: "jobId"})
Jobs.hasMany(JobQuotes, {foreignKey: "jobId"})
//Server Associations
Services.belongsTo(ServiceTypes,{foreignKey: "serviceTypeId"})
Services.belongsTo(ServiceCategories,{foreignKey: "serviceCategoryId"})
//User Associations
Users.belongsTo(Roles, {foreignKey: "roleId"})