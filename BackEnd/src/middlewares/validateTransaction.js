// src/middlewares/validateTransaction.js

const validateTransaction = (req, res, next) => {
  const { bidId } = req.body;

  // For transaction creation
  if (req.path === '/create') {
    if (!bidId || typeof bidId !== 'number') {
      return res.status(400).json({ message: 'Valid bidId is required.' });
    }
  }

  // For payment status update
  if (req.path === '/update') {
    const { paymentStatus } = req.body;
    const validStatuses = ['Pending', 'Paid', 'Failed'];
    
    if (!paymentStatus || !validStatuses.includes(paymentStatus)) {
      return res.status(400).json({ 
        message: 'Valid payment status is required (Pending, Paid, or Failed).' 
      });
    }
  }

  next();
};

module.exports = validateTransaction;