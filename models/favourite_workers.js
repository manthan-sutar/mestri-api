const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('favouriteWorkers', {
    id: {
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
    tableName: 'favourite_workers',
    timestamps: false,
    indexes: [
      {
        name: "userId",
        using: "BTREE",
        fields: [
          { name: "userId" },
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
