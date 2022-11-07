const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('services', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    serviceTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'service_types',
        key: 'id'
      }
    },
    serviceCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'service_categories',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    icon: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'services',
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
        name: "serviceTypeId",
        using: "BTREE",
        fields: [
          { name: "serviceTypeId" },
        ]
      },
      {
        name: "serviceCategoryId",
        using: "BTREE",
        fields: [
          { name: "serviceCategoryId" },
        ]
      },
    ]
  });
};
