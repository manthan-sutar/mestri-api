const { Model } = require("sequelize");
const Sequelize = require("sequelize");
const db = require("../config/database");
const User = require("./User");

class Role extends Model {}

Role.init(
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
		},
		type: Sequelize.STRING
	},
	{
		sequelize: db,
		modelName: "roles",
        timestamps: false,
        underscored: true
	}
);

User.belongsTo(Role, {foreignKey: 'role_id'});

module.exports = Role;
