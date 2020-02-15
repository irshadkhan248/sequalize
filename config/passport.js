var LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const sha512 = require("js-sha512");

module.exports = function(passport) {
	passport.use(
		new LocalStrategy(
			{
				usernameField: "username",
				passwordField: "password",
			},
			function(username, password, done) {
				User.findAll({
					where: { username: username },
				})
					.then(function(user, err) {
						// console.log("user:::", user);
						// console.log("err:::", err);
						if (err) {
							return done(err);
						}
						if (user.length === 0) {
							return done(null, false, {
								message: "Incorrect username.",
							});
						}
						if (sha512(password) != user[0].dataValues.password) {
							// console.log("password",user[0].dataValues.password);
							return done(null, false, {
								message: "Incorrect Password.",
							});
						}
						return done(null, user, { message: "successfully login" });
					})
					.catch(err => console.log("err:::::", err));
			},
		),
	);
};
