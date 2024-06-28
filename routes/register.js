const express = require("express");
const path = require("path");
const session = require("express-session");
const secret = require("../config/Key").secret;
const router = express.Router();

router.use(
  session({
    secret: secret, // Replace with a strong secret for session encryption
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      secure: false, // Set it to true if using HTTPS
      httpOnly: true,
    },
  })
);
// Require the controller functions
const {
  getRegister,
  getLogin,
  registerValition,
  loginValidation,
  getDash,
} = require("../controller/registeterController");

// Serve static files from the public directory
router.use(express.static(path.join(__dirname, "../public")));

// Routes
router.get("/register", getRegister);
router.get("/login", getLogin);
router.get("/dash", getDash);

// Handle form submissions
router.post("/register", registerValition);
router.post("/login", loginValidation);

module.exports = router;
