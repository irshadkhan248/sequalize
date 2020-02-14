const Sequelize = require("sequelize");
module.exports = new Sequelize("FinancialAppSchema", "root", "Yahoo@123", {
	host: "localhost",
	dialect: "mysql",
	logging: function() {},
	pool: {
		max: 5,
		min: 0,
		idle: 10000,
	},
});

// sequelize.
// 	authenticate()
// 	.then(() => {
// 		console.log("Connection established successfully.");
// 	})
// 	.catch(err => {
// 		console.error("Unable to connect to the database:", err);
// 	})
// 	.finally(() => {
// 		sequelize.close();
// 		// console.log('connection closed');
// 	});
