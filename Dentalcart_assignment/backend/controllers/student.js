const Student = require("../models/student");

exports.addStudents = async (req, res) => {
	const { data } = req.body;

	if (Array.isArray(data) && data.length > 0 && typeof data[0] === "object") {
		try {
			await Student.save(data);
		} catch (e) {
			console.log(e.message);
		}

		res.status(201).json({
			success: true,
			msg: "Students Added to Database",
		});
	} else {
		res.status(422).json({
			success: false,
			msg: "Select a valid CSV File",
		});
	}
};

exports.getStudents = async (req, res) => {
	try {
		const [rows] = await Student.fetchAll();

		if (rows && rows.length !== 0) {
			res.status(200).json({
				success: true,
				msg: "Successfully fetched data",
				data: rows,
			});
		} else {
			res.status(404).json({ success: false, msg: "No Data" });
		}
	} catch (e) {
		console.log(e.message);
	}
};
