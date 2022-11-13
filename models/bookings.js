const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bookings', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    workerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    workerServiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'worker_services',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'bookings',
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
        name: "workerId",
        using: "BTREE",
        fields: [
          { name: "workerId" },
        ]
      },
      {
        name: "userId",
        using: "BTREE",
        fields: [
          { name: "userId" },
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
        name: "workerServiceId",
        using: "BTREE",
        fields: [
          { name: "workerServiceId" },
        ]
      },
    ]
  });
};
