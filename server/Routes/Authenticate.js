// AuthenticateRoute.js
const express = require("express");
const router = express.Router();
require("dotenv").config();

const u = {
  username: process.env.LIBRARYUSERNAME,
  password: process.env.LIBRARYPASSWORD,
};

router.post("/loginuser", (req, res) => {
  const { username, password } = req.body;

  if (u.username === username && u.password === password) {
    console.log("Valid User");
    res.status(200).json({ success: true, message: "Login successful!" });
  } else {
    console.log("Invalid User");
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

module.exports = router;
