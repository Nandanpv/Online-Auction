const express = require('express');
const { placeBid } = require('../controllers/bidController'); // Assuming placeBid function is in bidController
const  adminAuthMiddleware  = require('../middlewares/adminAuthMiddleware'); // Import the verifyToken middleware

const router = express.Router();

// Apply verifyToken middleware to a protected route
router.post('/place-bid', adminAuthMiddleware, placeBid);

module.exports = router;
