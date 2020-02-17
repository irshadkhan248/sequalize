const Sequelize = require("sequelize");
const db = require("../config/database");
const role = require("./Role");
const user = require("./User");

const UserRole = db.define("userRole", {
	// role_id: {
	// 	type: Sequelize.BIGINT,
	// 	allowNull: true,
	// 	default: null,
	// },
	// user_id: {
	// 	type: Sequelize.BIGINT,
	// 	allowNull: true,
	// 	default: null,
	// },
	createdBy: {
		type: Sequelize.STRING,
		allowNull: true,
		default: null,
	},
	updatedBy: {
		type: Sequelize.STRING,
		allowNull: true,
		default: null,
	},
});

UserRole.belongsTo(role);
UserRole.belongsTo(user);

module.exports = UserRole;
