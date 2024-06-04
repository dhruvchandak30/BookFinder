const express = require("express");
const connectToDatabase = require("../db");
require("dotenv").config();

const router = express.Router();

// Define your secret key here
const SECRET_KEY = process.env.SECRET_KEY;

router.post("/deletebook", async (req, res) => {
  const { bookId, secretKey } = req.body;

  if (secretKey !== SECRET_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!bookId) {
    return res.status(400).json({ error: "Missing required field: bookId" });
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection("BookData");

    const result = await collection.deleteOne({ SrNo: bookId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).json({ error: "Failed to delete book" });
  }
});

module.exports = router;
