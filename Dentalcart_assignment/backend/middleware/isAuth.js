const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const authHeader = req.get("Authorization");
	if (!authHeader) {
		return res
			.status(401)
			.json({ success: false, msg: "Not Authenticated" });
	}
	const token = req.get("Authorization").split(" ")[1];
	let decodedToken;
	try {
		decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
	} catch (err) {
		return res.status(500).json({ success: false, msg: err.message });
	}

	if (!decodedToken) {
		return res
			.status(401)
			.json({ success: false, msg: "Not Authenticated" });
	}
	req.userId = decodedToken.userId;
	next();
};
