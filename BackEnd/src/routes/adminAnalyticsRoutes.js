// src/routes/adminAnalyticsRoutes.js

const express = require('express');
const router = express.Router();
const { getAdminAnalytics } = require('../controllers/adminAnalyticsController'); // Import admin analytics controller
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware'); // Import admin authentication middleware

/**
 * Route for admin analytics data
 * @route GET /admin/analytics
 * @access Private (Admin only)
 */
router.get('/admin/analytics', adminAuthMiddleware, getAdminAnalytics);

module.exports = router;
