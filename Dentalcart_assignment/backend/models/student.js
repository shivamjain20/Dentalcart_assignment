const db = require("../util/database");

module.exports = class Student {
	constructor(name, roll_no, address, institute, course, email) {
		this.name = name;
		this.roll_no = roll_no;
		this.address = address;
		this.institute = institute;
		this.course = course;
		this.email = email;
	}

	static save(data) {
		const dataArray = data.map((row) => [
			row.name,
			row.roll_no,
			row.address,
			row.institute,
			row.course,
			row.email,
		]);
		return db.query(
			"INSERT INTO students (name,roll_no,address,institute,course,email) VALUES ?",
			[dataArray]
		);
	}

	static fetchAll() {
		return db.execute("SELECT * FROM students");
	}
};
