const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Settings', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    appName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    version: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    goolgeApiKey: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    firebaseCloudSeverToken: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'settings',
    timestamps: false
  });
};
