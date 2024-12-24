// // src/routes/paymentRoutes.js
// // const express = require('express');
// // const router = express.Router();
// // const { processPayment } = require('../controllers/paymentController');
// // const authMiddleware = require('../middleware/authMiddleware'); // User auth middleware

// // // Payment route
// // router.post('/pay', authMiddleware, processPayment);

// // module.exports =processPayment
// // const express = require('express');
// // const router = express.Router();
// // const paymentController = require('../controllers/paymentController');
// // const authMiddleware = require('../middlewares/authMiddleware');

// // // Payment route
// // router.post('/pay', authMiddleware, paymentController);

// // module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { processPayment } = require('../controllers/paymentController');

// const authMiddleware = require('../middlewares/authMiddleware');

// // Payment route
// router.post('/pay', authMiddleware, processPayment);

// module.exports = router;
const express = require('express');
const router = express.Router();

// Define your POST route with a valid callback function
router.post('/processpayment', (req, res) => {
  // Logic to process the payment
  const { amount, method } = req.body;

  if (!amount || !method) {
    return res.status(400).send('Missing payment details');
  }

  // Assuming some payment processing logic here
  res.status(200).send('Payment processed successfully');
});

module.exports = router;
