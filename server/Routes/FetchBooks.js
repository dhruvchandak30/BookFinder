const express = require('express');
const connectToDatabase = require('../db');

const router = express.Router();

router.get('/fetch_books', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('BookData');

    const bookDataDocs = await collection.find({}).toArray();

    if (!bookDataDocs) {
      return res.status(404).json({ error: 'BookData documents not found' });
    }

    res.status(200).json(bookDataDocs);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

module.exports = router;
