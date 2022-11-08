const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bookingDetails', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    bookingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bookings',
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
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'booking_details',
    timestamps: false,
    indexes: [
      {
        name: "bookingId",
        using: "BTREE",
        fields: [
          { name: "bookingId" },
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
