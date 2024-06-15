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
console.log(req.body);
  if (u.username === username && u.password === password) {
    res.status(200).json({ success: true, message: "Login successful!" });
  } else if (u.username !== username || u.password !== password) {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  } else {
    res.status(401).json({ success: false, message: "Error In Server" });
  }
});

module.exports = router;
