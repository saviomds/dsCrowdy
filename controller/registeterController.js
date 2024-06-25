const path = require("path");
const bcrypt = require("bcryptjs");
const User = require("../model/User");
// Get Form layout
function getRegister(req, res) {
  res.sendFile(path.join(__dirname, "../public", "register.html"));
}
// Get Form layout
function getLogin(req, res) {
  res.sendFile(path.join(__dirname, "../public", "login.html"));
}
// Form Validation @Register
function registerValition(req, res) {
  const { username, password, password2, email } = req.body;

  // Basic validation
  if (!username || !password || !email || !password2) {
    return res.status(400).send("All fields are required.");
  }

  // Example: Check if email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send("Invalid email format.");
  }

  // Example: Check if password is at least 6 characters
  if (password.length < 6) {
    return res.status(400).send("Password must be at least 6 characters long.");
  }
  if (password !== password2) {
    return res.status(400).send("Password do not match");
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPwd = bcrypt.hashSync(password, salt);

  // CHeck User Already Exist
  let user = User.findOne({ email })
    .then((user) => {
      return res.status(400).send("User already exists.");
    })
    .catch((err) => console.log(err));

  // Create a new user
  user = new User({
    username,
    email,
    password,
  });

  user
    .save()
    .then((date) => res.send("Registration successful"))
    .catch(
      () => res.status(500).send("Server error"),
      console.error(err.message)
    );
}

// Form Validation @Login
function loginValidation(req, res) {
  res.send("hello");
}
module.exports = {
  getRegister,
  getLogin,
  registerValition,
  loginValidation,
};
