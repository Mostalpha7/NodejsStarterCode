const express = require("express");
const { register, login } = require("../controllers/auth.controller");
const router = express.Router();

// Create a user
router.post("/register", register);

// User Login
router.post("/login", login);

module.exports = router;