const express = require("express");
const connectToDatabase = require("../db");
require("dotenv").config();

const router = express.Router();

const SECRET_KEY = process.env.SECRET_KEY;

router.post("/deletebook", async (req, res) => {
  const { bookId, secretKey } = req.body.data;
  console.log("Request received with data:", req.body.data);

  if (secretKey !== SECRET_KEY) {
    console.log("Unauthorized access attempt with secretKey:", secretKey);
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!bookId) {
    return res.status(400).json({ error: "Missing required field: bookId" });
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection("BookData");

    // Convert bookId to an integer
    const bookIdInt = parseInt(bookId, 10);
    if (isNaN(bookIdInt)) {
      return res.status(400).json({ error: "Invalid book ID format" });
    }

    console.log("Attempting to delete book with SrNo:", bookIdInt);
    const result = await collection.deleteOne({ SrNo: bookIdInt });

    if (result.deletedCount === 0) {
      console.log("Book not found with SrNo:", bookIdInt);
      return res.status(404).json({ error: "Book not found" });
    }

    console.log("Book deleted successfully with SrNo:", bookIdInt);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).json({ error: "Failed to delete book" });
  }
});

module.exports = router;
