const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student");
const isAuth = require("../middleware/isAuth");

router.post("/api/addStudents", isAuth, studentController.addStudents);
router.get("/api/getStudents", isAuth, studentController.getStudents);

module.exports = router;
