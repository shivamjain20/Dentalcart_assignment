const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.post("/api/login", authController.login);
router.post("/api/signup", authController.signup);

module.exports = router;
