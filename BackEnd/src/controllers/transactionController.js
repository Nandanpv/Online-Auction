// // src/controllers/transactionController.js
// // const Transaction = require('../models/Transaction');
// // const Bid = require('../models/Bid');
// // const Item = require('../models/Item');

// // // Create a transaction for a winning bid
// // const createTransaction = async (req, res) => {
// //   const { bidId } = req.body;

// //   try {
// //     // Find the bid
// //     const bid = await Bid.findByPk(bidId, { include: Item });
// //     if (!bid) {
// //       return res.status(404).json({ message: 'Bid not found' });
// //     }

// //     // Check if the item is still active
// //     if (bid.Item.status !== 'Closed') {
// //       return res.status(400).json({ message: 'The auction for this item is still active' });
// //     }

// //     // Create a transaction
// //     const transaction = await Transaction.create({
// //       bidId,
// //       amount: bid.amount,
// //       paymentStatus: 'Pending', // Default status
// //     });

// //     res.status(201).json({ message: 'Transaction created successfully', transaction });
// //   } catch (error) {
// //     console.error('Error creating transaction:', error);
// //     res.status(500).json({ message: 'Error creating transaction', error: error.message });
// //   }
// // };

// // // Update payment status for a transaction
// // const updatePaymentStatus = async (req, res) => {
// //   const { transactionId, paymentStatus } = req.body;

// //   try {
// //     // Find the transaction
// //     const transaction = await Transaction.findByPk(transactionId);
// //     if (!transaction) {
// //       return res.status(404).json({ message: 'Transaction not found' });
// //     }

// //     // Update the payment status
// //     transaction.paymentStatus = paymentStatus;
// //     await transaction.save();

// //     res.status(200).json({ message: 'Payment status updated successfully', transaction });
// //   } catch (error) {
// //     console.error('Error updating payment status:', error);
// //     res.status(500).json({ message: 'Error updating payment status', error: error.message });
// //   }
// // };

// // module.exports = { createTransaction, updatePaymentStatus };

// // src/controllers/transactionController.js
// const Transaction = require('../models/Transaction');
// const Bid = require('../models/Bid');
// const Item = require('../models/Item');

// // Create a transaction for a winning bid
// const createTransaction = async (req, res) => {
//   const { bidId } = req.body;

//   try {
//     // Find the bid
//     const bid = await Bid.findByPk(bidId, { include: Item });
//     if (!bid) {
//       return res.status(404).json({ message: 'Bid not found' });
//     }

//     // Check if the item is still active
//     if (bid.Item.status !== 'Closed') {
//       return res.status(400).json({ message: 'The auction for this item is still active' });
//     }

//     // Create a transaction
//     const transaction = await Transaction.create({
//       bidId,
//       amount: bid.amount,
//       paymentStatus: 'Pending', // Default status
//     });

//     res.status(201).json({ message: 'Transaction created successfully', transaction });
//   } catch (error) {
//     console.error('Error creating transaction:', error);
//     res.status(500).json({ message: 'Error creating transaction', error: error.message });
//   }
// };

// // Update payment status for a transaction
// const updatePaymentStatus = async (req, res) => {
//   const { transactionId, paymentStatus } = req.body;

//   try {
//     // Find the transaction
//     const transaction = await Transaction.findByPk(transactionId);
//     if (!transaction) {
//       return res.status(404).json({ message: 'Transaction not found' });
//     }

//     // Validate payment status
//     const validPaymentStatus = ['Pending', 'Paid', 'Failed'];
//     if (!validPaymentStatus.includes(paymentStatus)) {
//       return res.status(400).json({ message: 'Invalid payment status' });
//     }

//     // Update the payment status
//     transaction.paymentStatus = paymentStatus;
//     await transaction.save();

//     res.status(200).json({ message: 'Payment status updated successfully', transaction });
//   } catch (error) {
//     console.error('Error updating payment status:', error);
//     res.status(500).json({ message: 'Error updating payment status', error: error.message });
//   }
// };

// // Get all transactions
// const getAllTransactions = async (req, res) => {
//   try {
//     const transactions = await Transaction.findAll();
//     res.status(200).json({ message: 'Transactions retrieved successfully', transactions });
//   } catch (error) {
//     console.error('Error retrieving transactions:', error);
//     res.status(500).json({ message: 'Error retrieving transactions', error: error.message });
//   }
// };

// // Get a transaction by ID
// const getTransactionById = async (req, res) => {
//   const { transactionId } = req.params;

//   try {
//     const transaction = await Transaction.findByPk(transactionId);
//     if (!transaction) {
//       return res.status(404).json({ message: 'Transaction not found' });
//     }

//     res.status(200).json({ message: 'Transaction retrieved successfully', transaction });
//   } catch (error) {
//     console.error('Error retrieving transaction:', error);
//     res.status(500).json({ message: 'Error retrieving transaction', error: error.message });
//   }
// };

// module.exports = { createTransaction, updatePaymentStatus, getAllTransactions, getTransactionById };

// src/controllers/transactionController.js
const Transaction = require('../models/Transaction');
const Bid = require('../models/Bid');
const Item = require('../models/Item');
const Notification = require('../models/Notification');

// Create a transaction for a winning bid
const createTransaction = async (req, res) => {
  const { bidId } = req.body;

  try {
    // Find the bid
    const bid = await Bid.findByPk(bidId, { include: Item });
    if (!bid) {
      return res.status(404).json({ message: 'Bid not found' });
    }

    // Check if the item is still active
    if (bid.Item.status !== 'Closed') {
      return res.status(400).json({ message: 'The auction for this item is still active' });
    }

    // Create a transaction
    const transaction = await Transaction.create({
      bidId,
      amount: bid.amount,
      paymentStatus: 'Pending', // Default status
    });

    res.status(201).json({ message: 'Transaction created successfully', transaction });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ message: 'Error creating transaction', error: error.message });
  }
}

// Update payment status for a transaction
const updatePaymentStatus = async (req, res) => {
  const { transactionId, paymentStatus } = req.body;

  try {
    // Find the transaction
    const transaction = await Transaction.findByPk(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Validate payment status
    const validPaymentStatus = ['Pending', 'Paid', 'Failed'];
    if (!validPaymentStatus.includes(paymentStatus)) {
      return res.status(400).json({ message: 'Invalid payment status' });
    }

    // Update the payment status
    transaction.paymentStatus = paymentStatus;
    await transaction.save();

    res.status(200).json({ message: 'Payment status updated successfully', transaction });
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ message: 'Error updating payment status', error: error.message });
  }
  // Notify the user about payment status update
await Notification.create({
  userId: transaction.userId, // Assuming transaction tracks the user ID
  message: `Your payment status for the auction on "${transaction.Item.name}" has been updated to: ${paymentStatus}.`,
});
// Update the item status if the payment status is 'Paid'
}

// Get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.status(200).json({ message: 'Transactions retrieved successfully', transactions });
  } catch (error) {
    console.error('Error retrieving transactions:', error);
    res.status(500).json({ message: 'Error retrieving transactions', error: error.message });
  }
}

// Get a transaction by ID
const getTransactionById = async (req, res) => {
  const { transactionId } = req.params;

  try {
    const transaction = await Transaction.findByPk(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json({ message: 'Transaction retrieved successfully', transaction });
  } catch (error) {
    console.error('Error retrieving transaction:', error);
    res.status(500).json({ message: 'Error retrieving transaction', error: error.message });
  }
}

// Delete a transaction by ID
const deleteTransactionById = async (req, res) => {
  const { transactionId } = req.params;

  try {
    const transaction = await Transaction.findByPk(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    await transaction.destroy();

    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ message: 'Error deleting transaction', error: error.message });
  }
// Notify the user about payment status update
await Notification.create({
  userId: transaction.userId, // Assuming transaction tracks the user ID
  message: `Your payment status for the auction on "${transaction.Item.name}" has been updated to: ${paymentStatus}.`,
});

}

module.exports = { createTransaction, updatePaymentStatus, getAllTransactions, getTransactionById, deleteTransactionById };