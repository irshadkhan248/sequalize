const express = require("express");
const router = express.Router();
const db = require("../config/database");
const UserRole = require("../models/UserRole");
const Sequelize = require("sequelize");
var bodyParser = require("body-parser");
router.use(bodyParser.json());
const Op = Sequelize.Op;

// const app = express()

// Note: using `force: true` will drop the table if it already exists
UserRole.sync({ force: false }).then(() => {
	// Now the `UserRole` table in the database corresponds to the model definition
	console.log("userRole table created");
});

// Find all userRole
router.get("/findAll", (req, res) =>
	UserRole.findAll()
		.then(userRole => {
			res.status(200).send(userRole);
			// console.log("All userRole::::", JSON.stringify(userRole, null, 4));
		})
		.catch(err => console.log(err)),
);

// Add a record
router.post("/add", (req, res) => {
	console.log("body:::::::", req.body);
	// Insert into table
	UserRole.create(req.body)
		.then(userRole => res.status(200).send(userRole))
		.catch(err => console.log(err));
});

// Search for record
router.get("/search", (req, res) => {
	let term = req.query.id;
	// console.log("query",req.query,term);
	UserRole.findAll({ where: { id: term } })
		.then(userRole => res.status(200).send(userRole))
		.catch(err => console.log(err));
});

//update a record using id in query
router.post("/update", (req, res) => {
	console.log("reqbody::::", req.body, "reqQuery::::", req.query);
	let term = req.query.id;
	UserRole.update(req.body, { where: { id: term } })
		.then(userRole => res.status(200).send(userRole))
		.catch(err => console.log(err));
});

//delete a record using id in query
router.delete("/delete", (req, res) => {
	console.log("reqQuery::::", req.query);
	let term = req.query.id;
	UserRole.destroy({ where: { id: term } })
		.then(userRole => res.send(200).send(userRole))
		.catch(err => console.log(err));
});

module.exports = router;
