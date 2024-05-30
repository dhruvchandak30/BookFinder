const express = require("express");
const connectToDatabase = require("../db");
require("dotenv").config();

const router = express.Router();

// Your secret key, replace with your actual key
const secretKey = process.env.SECRET_KEY;

router.post("/deletebook", async (req, res) => {
  console.log(req.body.data);

  const bookId = req.body.data.bookId;
  const secretKeyInput = req.body.data.secretKey;
  if (!bookId || !secretKeyInput) {
    return res.status(400).json({ error: "Missing book ID or secret key" });
  }

  if (secretKeyInput !== secretKey) {
    return res.status(403).json({ error: "Invalid secret key" });
  }

  const parsedBookId = parseInt(bookId, 10);
  if (isNaN(parsedBookId)) {
    return res.status(400).json({ error: "Invalid book ID" });
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection("BookData");

    const bookDataDoc = await collection.findOne({});

    if (!bookDataDoc) {
      return res.status(404).json({ error: "BookData document not found" });
    }

    const bookExists = bookDataDoc.Data.some(
      (book) => book.Id === parsedBookId
    );

    if (!bookExists) {
      return res.status(404).json({ error: "Book not found" });
    }

    await collection.updateOne(
      { _id: bookDataDoc._id },
      { $pull: { Data: { Id: parsedBookId } } }
    );

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).json({ error: "Failed to delete book" });
  }
});

module.exports = router;
