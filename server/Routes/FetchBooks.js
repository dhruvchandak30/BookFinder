const express = require('express');
const connectToDatabase = require('../db');

const router = express.Router();

router.get('/fetch_books', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('BookData');

    const bookDataDoc = await collection.findOne({});

    if (!bookDataDoc) {
      return res.status(404).json({ error: 'BookData document not found' });
    }

    const data = bookDataDoc.Data || [];

    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

module.exports = router;
