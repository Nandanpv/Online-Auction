// // src/routes/transactionRoutes.js
// // const express = require('express');
// // const router = express.Router();
// // const { createTransaction, updatePaymentStatus } = require('../controllers/transactionController');
// // const adminAuthMiddleware = require('../middlewares/authMiddleware'); // Admin-specific middleware

// // // Create a transaction for a winning bid
// // router.post('/create', adminAuthMiddleware, createTransaction);

// // // Update payment status
// // router.put('/update', adminAuthMiddleware, updatePaymentStatus);

// // module.exports = router;

// // src/routes/transactionRoutes.js
// const express = require('express');
// const router = express.Router();
// const { 
//   createTransaction, 
//   updatePaymentStatus, 
//   getTransactions, 
//   deleteTransaction 
// } = require('../controllers/transactionController');
// const adminAuthMiddleware = require('../middlewares/authMiddleware'); // Admin-specific middleware
// const validateTransaction = require('../middlewares/validateTransaction');

// // Create a transaction for a winning bid
// router.post('/create', adminAuthMiddleware, validateTransaction, createTransaction);

// // Update payment status
// router.put('/update/:id', adminAuthMiddleware, validateTransaction, updatePaymentStatus);

// // Get all transactions
// router.get('/all', adminAuthMiddleware, getTransactions);

// // Delete a transaction
// router.delete('/delete/:id', adminAuthMiddleware, deleteTransaction);

// module.exports = router;
const express = require('express');
const router = express.Router();
const {
  createTransaction,
  updatePaymentStatus,
  getAllTransactions,
  getTransactionById,
  deleteTransactionById
} = require('../controllers/transactionController');
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');
const validateTransaction = require('../middlewares/validateTransaction');

// Create a transaction
router.post('/create', adminAuthMiddleware, validateTransaction, createTransaction);

// Update payment status
router.put('/update/:id', adminAuthMiddleware, validateTransaction, updatePaymentStatus);

// Get all transactions
router.get('/all', adminAuthMiddleware, getAllTransactions);

// Get transaction by ID
router.get('/:id', adminAuthMiddleware, getTransactionById);

// Delete a transaction
router.delete('/delete/:id', adminAuthMiddleware, deleteTransactionById);

module.exports = router;