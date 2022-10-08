const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('workerServices', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'services',
        key: 'id'
      }
    },
    workerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'workers',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'worker_services',
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
        name: "serviceId",
        using: "BTREE",
        fields: [
          { name: "serviceId" },
          { name: "workerId" },
        ]
      },
      {
        name: "workerId",
        using: "BTREE",
        fields: [
          { name: "workerId" },
        ]
      },
    ]
  });
};
