const express = require("express");
const path = require("path");
const router = express.Router();

// Require the controller functions
const {
  getRegister,
  getLogin,
  registerValition,
  loginValidation,
} = require("../controller/registeterController");

// Serve static files from the public directory
router.use(express.static(path.join(__dirname, "../public")));

// Routes
router.get("/register", getRegister);
router.get("/login", getLogin);

// Handle form submissions
router.post("/register", registerValition);
router.post("/login", loginValidation);

module.exports = router;
