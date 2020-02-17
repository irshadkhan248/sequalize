const Sequelize = require("sequelize");
const db = require("../config/database");

const User = db.define("user", {
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
	account_expired: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		default: null,
	},
	account_locked: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		default: null,
	},
	contact: {
		type: Sequelize.BLOB('tiny'),
		allowNull: true,
		default: null,
	},
	enabled: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		default: null,
	},
	first_name: {
		type: Sequelize.STRING,
		allowNull: true,
		default: null,
	},
	last_name: {
		type: Sequelize.STRING,
		allowNull: true,
		default: null,
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
		default: null,
	},
	password_expired: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		default: null,
	},
	username: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
		default: null,
	},
	referrer: {
		type: Sequelize.STRING,
		allowNull: true,
		default: null,
	},
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
});

module.exports = User;
