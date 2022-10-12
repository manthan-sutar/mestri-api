const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('countries', {
    id: {
      autoIncrement: true,
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    // iso3: {
    //   type: DataTypes.CHAR(3),
    //   allowNull: true
    // },
    // numericCode: {
    //   type: DataTypes.CHAR(3),
    //   allowNull: true,
    //   field: 'numeric_code'
    // },
    iso2: {
      type: DataTypes.CHAR(2),
      allowNull: true
    },
    phonecode: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    capital: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    currency: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    currencyName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'currency_name'
    },
    currencySymbol: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'currency_symbol'
    },
    tld: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    native: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    region: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    subregion: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    timezones: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    translations: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    latitude: {
      type: DataTypes.DECIMAL(10,8),
      allowNull: true
    },
    longitude: {
      type: DataTypes.DECIMAL(11,8),
      allowNull: true
    },
    emoji: {
      type: DataTypes.STRING(191),
      allowNull: true
    },
    emojiU: {
      type: DataTypes.STRING(191),
      allowNull: true
    },
    flag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'countries',
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
    ]
  });
};
