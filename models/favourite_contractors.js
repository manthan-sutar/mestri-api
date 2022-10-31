const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FavouriteContractors', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
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
    tableName: 'favourite_contractors',
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
        name: "userId",
        using: "BTREE",
        fields: [
          { name: "userId" },
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
