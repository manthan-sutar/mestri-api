const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('jobDetails', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'jobs',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    lat: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    lng: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    isUrgent: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    dueRangeStart: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    dueRangeEnd: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    addressId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'addresses',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'job_details',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "jobId",
        using: "BTREE",
        fields: [
          { name: "jobId" },
        ]
      },
      {
        name: "addressId",
        using: "BTREE",
        fields: [
          { name: "addressId" },
        ]
      },
    ]
  });
};
