const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Role = require("../models/Role");
const Sequelize = require("sequelize");
var bodyParser = require("body-parser");
router.use(bodyParser.json());
const Op = Sequelize.Op;

// const app = express()

// Note: using `force: true` will drop the table if it already exists
Role.sync({ force: false }).then(() => {
	// Now the `Role` table in the database corresponds to the model definition
	console.log("role table created");
});

// Find all role
router.get("/findAll", (req, res) =>
	Role.findAll()
		.then(role => {
			res.status(200).send(role);
			// console.log("All role::::", JSON.stringify(role, null, 4));
		})
		.catch(err => console.log(err)),
);

// Add a record
router.post("/add", (req, res) => {
	console.log("body:::::::", req.body);
	// Insert into table
	Role.create(req.body)
		.then(role => res.status(200).send(role))
		.catch(err => console.log(err));
});

// Search for record
router.get("/search", (req, res) => {
	let term = req.query.id;
	// console.log("query",req.query,term);
	Role.findAll({ where: { id: term } })
		.then(role => res.status(200).send(role))
		.catch(err => console.log(err));
});

//update a record using id in query
router.post("/update", (req, res) => {
	// console.log("reqbody::::", req.body, "reqQuery::::", req.query);
	let term = req.query.id;
	Role.update(req.body, { where: { id: term } })
		.then(role => res.status(200).send(role))
		.catch(err => console.log(err));
});

//delete a record using id in query
router.delete("/delete", (req, res) => {
	console.log("reqQuery::::", req.query);
	let term = req.query.id;
	Role.destroy({ where: { id: term } })
		.then(role => res.sendStatus(200).sendStatus(role))
		.catch(err => console.log(err));
});

//search using pagination
router.get("/pagination", async (req, res) => {
	console.log(req.body);
	var page = Number(req.body.page)
	pageno = page > 0 ? page : pageno
	var limit = Number(req.body.limit)
	limitno = limit > 0 ? limit : limitno
	var skip = (pageno * limitno - limitno)
	const { count, rows } = await Role.findAndCountAll({
		offset: skip,
		limit: limitno
	});
	console.log(count);
	res.send({ Role:rows,totalEntries:count});
});

module.exports = router;
