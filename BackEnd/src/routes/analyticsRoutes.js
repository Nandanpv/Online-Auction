// src/routes/analyticsRoutes.js
const express = require('express');
const router = express.Router();
const { getAnalytics } = require('../controllers/analyticsController');
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware'); // Admin auth middleware

// Admin route to get analytics data
router.get('/analytics', adminAuthMiddleware, getAnalytics);

module.exports = router;
