const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const connectToDatabase = require('../db');

// POST route to update the counter
router.post('/update-counter', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('Counter');
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId('664c42637c3966e6bb9fdd4c') },
      { $inc: { value: 1 } },
      { returnDocument: 'after' }
    );

    if (result.value) {
      console.log('Counter updated:', result.value.value); // Log the updated counter value
      res.status(200).json({ message: 'Counter updated', newValue: result.value.value });
    } else {
      res.status(500).json({ message: 'Failed to update counter' });
    }
  } catch (error) {
    console.error('Error occurred:', error); // Log the error
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

// GET route to get the counter value
router.get('/get-counter', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('Counter');
    const result = await collection.findOne({ _id: new ObjectId('664c42637c3966e6bb9fdd4c') });

    if (result) {
      res.status(200).json({ message: 'Counter fetched', value: result.value });
    } else {
      res.status(404).json({ message: 'Counter not found' });
    }
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

module.exports = router;
