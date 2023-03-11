const dotenv = require("dotenv");
dotenv.config();

const express = require("express");

const PORT = process.env.PORT || 8080;
const app = express();

// Routes
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/student");

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization"
	);
	next();
});
app.use(express.json());

app.use(authRoutes);
app.use(studentRoutes);

app.listen(PORT, () => {
	console.log(`listening on http://localhost:${PORT}`);
});
