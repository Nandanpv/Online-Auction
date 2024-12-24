
const express = require('express');
const { placeBid } = require('../controllers/bidController');
const  adminAuthMiddleware= require('../middlewares/adminAuthMiddleware'); // Ensure the middleware is imported
const router = express.Router();

// Apply protect middleware to secure the route
router.post('/', adminAuthMiddleware, placeBid);

module.exports = router;
