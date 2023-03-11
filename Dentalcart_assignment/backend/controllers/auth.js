const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const [user] = await User.authenticateUser(
			email.trim().toString(),
			password.trim().toString()
		);

		if (user?.length === 0) {
			res.status(422).json({ success: false, msg: "User Not Found!" });
		} else {
			const token = jwt.sign(
				{
					email: user[0].email,
					userId: user[0].id.toString(),
				},
				process.env.JWT_SECRET_KEY,
				{
					expiresIn: "2d",
				}
			);

			return res.status(200).json({
				success: true,
				msg: "Successfully generated JWT token",
				token: token,
				userId: user[0].id.toString(),
				expiresIn: 2 * 24 * 60 * 60,
			});
		}
	} catch (e) {
		console.log(e.message);
	}
};

exports.signup = async (req, res) => {
	const { email, password } = req.body;

	try {
		const [user] = await User.findByEmail(email);

		if (user && user.length === 1) {
			res.status(422).json({
				success: false,
				msg: "User Already Exists!",
			});
		} else {
			const newUser = new User(
				email.trim().toString(),
				password.trim().toString()
			);

			try {
				await newUser.save();
			} catch (e) {
				console.log(e.message);
			}

			res.status(201).json({
				success: true,
				msg: "User Created",
			});
		}
	} catch (e) {
		console.log(e.message);
	}
};
