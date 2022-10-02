const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('jobQuotes', {
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
    quoterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    contractId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    estimatedAmount: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'job_quote_status',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'job_quotes',
    timestamps: true,
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
        name: "statusId",
        using: "BTREE",
        fields: [
          { name: "statusId" },
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
        name: "quoterId",
        using: "BTREE",
        fields: [
          { name: "quoterId" },
        ]
      },
      {
        name: "contractId",
        using: "BTREE",
        fields: [
          { name: "contractId" },
        ]
      },
    ]
  });
};
