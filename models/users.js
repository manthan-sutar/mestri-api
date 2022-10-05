const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id'
      }
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "username"
    },
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    profilePicture: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    loginType: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    countryCode: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    userStatus: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "INACTIVE"
    }
  }, {
    sequelize,
    tableName: 'users',
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
        name: "username",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
      {
        name: "roleId",
        using: "BTREE",
        fields: [
          { name: "roleId" },
        ]
      },
    ]
  });
};
