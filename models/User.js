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
        role_id: {
			type: Sequelize.INTEGER,
		},
		login_type: Sequelize.STRING,
		username: Sequelize.STRING,
		email: Sequelize.STRING,
		country_code: Sequelize.STRING,
		phone: Sequelize.STRING,
		password: Sequelize.STRING,
	},
	{
		sequelize: db,
		modelName: "users",
        underscored: true,
		defaultScope: {
			attributes: { exclude: ['password','login_type','role_id'] },
		},
	} 
	
); 

module.exports = User;
