// src/routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const { getNotifications, markAsRead } = require('../controllers/notificationController');
//const authMiddleware = require('../middlewares/authMiddleware');
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');
// Get all notifications for a user
router.get('/', adminAuthMiddleware, getNotifications);

// Mark a notification as read
router.put('/mark-as-read', adminAuthMiddleware, markAsRead);

module.exports = router;
