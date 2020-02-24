const Sequelize = require("sequelize");
const db = require("../config/database");
const role = require("./Role");
const user = require("./User");

const UserRole = db.define("userRole", {
	createdBy: {
		type: Sequelize.STRING,
		allowNull: false,
		default: null,
	},
	updatedBy: {
		type: Sequelize.STRING,
		allowNull: false,
		default: null,
	},
	userId: {
		type: Sequelize.BIGINT,
		primaryKey: true,
	},
	roleId: {
		type: Sequelize.BIGINT,
		primaryKey: true,
	},
});
UserRole.belongsTo(role);
UserRole.belongsTo(user);
UserRole.removeAttribute("id");
module.exports = UserRole;
