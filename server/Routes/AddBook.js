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

    const lastBook = await collection
      .find()
      .sort({ SrNo: -1 })
      .limit(1)
      .toArray();
    const newSrNo = lastBook.length > 0 ? lastBook[0].SrNo + 1 : 1;

    const newBook = {
      SrNo: newSrNo,
      BayGuide: Address,
      Shelf,
      Class,
      Keyword,
    };

    await collection.insertOne(newBook);

    res
      .status(201)
      .json({ message: "Book added successfully", sr_no: newSrNo });
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).json({ error: "Failed to add book" });
  }
});

module.exports = router;
