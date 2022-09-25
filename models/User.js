const { Model } = require("sequelize");
const Sequelize = require("sequelize");
const db = require("../config/database");

class User extends Model {}

User.init(
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
		},
        roleId: {
			type: Sequelize.INTEGER,
		},
		loginType: Sequelize.STRING,
		username: Sequelize.STRING,
		email: Sequelize.STRING,
		countryCode: Sequelize.STRING,
		phone: Sequelize.STRING,
		password: Sequelize.STRING,
	},
	{
		sequelize: db,
		modelName: "users",
		defaultScope: {
			attributes: { exclude: ['password','loginType','roleId'] },
		},
	} 
	
); 

module.exports = User;
