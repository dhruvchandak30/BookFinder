const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

// Define your secret key here
const SECRET_KEY = process.env.SECRET_KEY;

// Route to add a new notification
router.post('/addnotifications', async (req, res) => {
    try {
        const { title, description, date, secretKey, imageUrl } = req.body;

        // Check if the secret key matches
        if (secretKey !== SECRET_KEY) {
            throw new Error("Unauthorized");
        }

        const newNotification = new Notification({ title, description, date, imageUrl });
        await newNotification.save();
        res.status(201).json(newNotification);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

router.post('/notifications', async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ createdAt: -1 });
        return res.status(200).json({ notifications });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});
// Route to delete a notification by ID
router.post('/deletenotification', async (req, res) => {
    try {
        const { id,secKey } = req.body;
        if(secKey!=SECRET_KEY){
            return res.json({error:"Not Authorized"});
        }
        
        // Find and delete the notification by ID
        const notification = await Notification.findByIdAndDelete(id);
        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




// Configure Cloudinary
cloudinary.config({ 
    cloud_name: "dqhvbtzjq", 
    api_key: "535382522962823", 
    api_secret: "C_G1hEapumsC35nYvWvDfIl7z3Q" 
});

module.exports = router;
