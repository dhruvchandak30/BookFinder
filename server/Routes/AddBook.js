const express = require("express");
const connectToDatabase = require("../db");
require("dotenv").config();

const router = express.Router();

// Define your secret key here
const SECRET_KEY = process.env.SECRET_KEY;

router.post("/addbooklibrary", async (req, res) => {
  const { Address, Shelf, Class, Keyword, secretKey } = req.body;

  if (secretKey !== SECRET_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!Address || !Shelf || !Class || !Keyword) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection("BookData");

    const bookDataDoc = await collection.findOne({});

    if (!bookDataDoc) {
      return res.status(404).json({ error: "BookData document not found" });
    }

    const lastBook = bookDataDoc.Data.slice().sort((a, b) => b.Id - a.Id)[0];
    const newId = lastBook ? lastBook.Id + 1 : 1;
    const newBook = { Id: newId, Address, Shelf, Class, Keyword };

    await collection.updateOne(
      { _id: bookDataDoc._id },
      { $push: { Data: newBook } }
    );

    res
      .status(201)
      .json({ message: "Book added successfully", book_id: newId });
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).json({ error: "Failed to add book" });
  }
});

module.exports = router;
