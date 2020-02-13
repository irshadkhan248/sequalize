const Sequelize = require("sequelize");
const db = require("../config/database");
const role = require("./Role");
const user = require("./User");


	const UserRole = db.define("userRole", {
		role_id: {
			type: Sequelize.INTEGER,
			notNull: true,
			default: null,
		},
		user_id: {
			type: Sequelize.INTEGER,
			notNull: true,
			default: null,
		},
		createdBy: {
			type: Sequelize.STRING,
			notNull: true,
			default: null,
		},
		updatedBy: {
			type: Sequelize.STRING,
			notNull: true,
			default: null,
		}
	})

// role.belongsTo(UserRole,{foreignKey:"id"});
// user.belongsTo(UserRole,{foreignKey:"id"});
// UserRole.belongsTo(role);
// UserRole.belongsTo(user);

module.exports = UserRole;
