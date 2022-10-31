const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ContractorServices', {
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
    contractorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'contractors',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'contractor_services',
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
          { name: "contractorId" },
        ]
      },
      {
        name: "contractorId",
        using: "BTREE",
        fields: [
          { name: "contractorId" },
        ]
      },
    ]
  });
};
