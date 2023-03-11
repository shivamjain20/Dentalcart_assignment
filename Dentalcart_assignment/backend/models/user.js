const db = require("../util/database");

module.exports = class User {
	constructor(email, password) {
		this.email = email;
		this.password = password;
	}

	save() {
		return db.execute("INSERT INTO users (email,password) VALUES (?,?)", [
			this.email,
			this.password,
		]);
	}

	static findByEmail(email) {
		return db.execute("SELECT * FROM users WHERE users.email = ?", [email]);
	}

	static authenticateUser(email, password) {
		return db.execute(
			"SELECT * FROM users WHERE users.email = ? AND users.password = ?",
			[email, password]
		);
	}
};
