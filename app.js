// app.js
require("dotenv").config();
const express = require("express");
const path = require("path");
const router = require("./routes/register");
const app = express();
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

// Middleware body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./config/Key").MongooseDb;
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

// Use the register router for the /users path
app.use("/users", require("./routes/register"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
