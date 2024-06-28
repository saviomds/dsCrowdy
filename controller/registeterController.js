const path = require("path");
const bcrypt = require("bcryptjs");
const router = require("../routes/register");
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

  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.send("Email Already Exists");
      } else {
        //  Create a new user
        user = new User({
          username,
          email,
          password: hashedPwd,
        });

        user
          .save()
          .then((data) => res.send("Registration successful"))
          .catch((error) => console.log(error));
      }
    })
    .catch((err) => {
      // Handle any potential errors from findOne
      console.error("Error checking for user:", err);
      res.status(500).send("Internal Server Error");
    });
}

// Form Validation @Login
function loginValidation(req, res) {
  const { password, email } = req.body;
  if (!password || !email) {
    return res.status(400).send("All fields are required.");
  }
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send("User not found. Please check your credentials.");
      }
      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            // Store user information in session
            req.session.user = {
              id: user._id,
              email: user.email,
              username: user.username,
              // Add more user properties as needed
            };
            res.redirect("dash");

            // Optionally, set up a session or issue a token here
          } else {
            res.status(401).send("Password incorrect.");
          }
        })
        .catch((err) => {
          console.error("Error comparing passwords:", err);
          res.status(500).send("Internal Server Error");
        });
    })
    .catch((err) => {
      console.error("Error checking for user:", err);
      res.status(500).send("Internal Server Error");
    });
}
function getDash(req, res) {
  // Check if user session exists
  if (req.session.user) {
    const user = req.session.user; // Retrieve user object from session
    res.render("dashboard", { user }); // Pass user object to the dashboard view
  } else {
    // If user session does not exist, render dashboard for Guest or handle as needed
    res.render("dashboard", { user: null }); // Pass null or handle as appropriate
  }
}

module.exports = {
  getRegister,
  getLogin,
  registerValition,
  loginValidation,
  getDash,
};
