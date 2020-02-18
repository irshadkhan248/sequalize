const express = require("express");
const router = express.Router();
const db = require("../config/database");
const User = require("../models/User");
const Sequelize = require("sequelize");
var bodyParser = require("body-parser");
const passport = require("passport");
const sha512 = require("js-sha512");
const Op = Sequelize.Op;

router.use(bodyParser.json());

// Note: using `force: true` will drop the table if it already exists
User.sync({ force: false }).then(() => {
	// Now the `User` table in the database corresponds to the model definition
	console.log("user table created");
});

// Find all users
router.get("/findAll", (req, res) =>
	User.findAll()
		.then(users => {
			res.status(200).send(users);
			// console.log("All users::::", JSON.stringify(users, null, 4));
		})
		.catch(err => console.log(err)),
);

// Add a record
router.post("/add", (req, res) => {
	// console.log("body:::::::", req.body.password);
	req.body.password = sha512(req.body.password);
	// Insert into table
	User.create(req.body)
		.then(users => res.status(200).send(users))
		.catch(err => console.log(err));
});

// Search for record
router.get("/search", (req, res) => {
	let term = req.query.id;
	// console.log("query",req.query,term);
	User.findAll({ where: { id: term } })
		.then(users => res.status(200).send(users))
		.catch(err => console.log(err));
});

//update a record using id in query
router.post("/update", (req, res) => {
	console.log("reqbody::::", req.body, "reqQuery::::", req.query);
	let term = req.query.id;
	User.update(req.body, { where: { id: term } })
		.then(users => res.status(200).send(users))
		.catch(err => console.log(err));
});

//delete a record using id in query
router.delete("/delete", (req, res) => {
	let term = req.query.id;
	console.log("reqQuery::::", term);
	User.destroy({ where: { id: term } })
		.then(users => res.sendStatus(200).send(users))
		.catch(err => console.log(err));
});

//search using pagination
router.get("/pagination", async (req, res) => {
	console.log(req.body);
	var page = Number(req.body.page);
	pageno = page > 0 ? page : pageno;
	var limit = Number(req.body.limit);
	limitno = limit > 0 ? limit : limitno;
	var skip = pageno * limitno - limitno;
	const { count, rows } = await User.findAndCountAll({
		offset: skip,
		limit: limitno,
	});
	console.log(count);
	res.send({ users: rows, totalEntries: count });
});

//Login
router.post("/login", (req, res, next) => {
	passport.authenticate("local", function(err, user, info) {
		// console.log("err::", err, "\n", "user::", user, "\ninfo:::", info);

		console.log("info", info);
		if (err) {
			// console.log("here3", err);
			return next(err);
		}
		if (!user) {
			return res.send("/login");
		} else {
			return res.send("/dashboard");
		}
	})(req, res, next);
});
//logout
router.get("/logout", function(req, res) {
	req.logout();
	res.send("/login");
});

module.exports = router;
