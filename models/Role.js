const Sequelize = require("sequelize");
const db = require("../config/database");

const Role = db.define("role", {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},
	version: {
		type: Sequelize.INTEGER,
		allowNull: false,
		default: null,
	},
	authority: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		default: null,
	},
	createdBy: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	updatedBy: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

module.exports = Role;
