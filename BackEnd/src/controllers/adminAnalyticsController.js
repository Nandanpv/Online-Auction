// src/controllers/adminAnalyticsController.js

const Item = require('../models/Item');
const Bid = require('../models/Bid');
const Transaction = require('../models/Transaction');
const sequelize = require('sequelize'); // Ensure Sequelize is correctly imported

// Admin-specific analytics controller
const getAdminAnalytics = async (req, res) => {
  try {
    // Perform all database queries concurrently
    const [
      totalItems,
      totalBids,
      successfulTransactions,
      paymentStatusCount,
    ] = await Promise.all([
      Item.count(), // Count total items
      Bid.count(), // Count total bids
      Transaction.count({ where: { paymentStatus: 'Completed' } }), // Count completed transactions
      Transaction.findAll({
        attributes: [
          'paymentStatus',
          [sequelize.fn('COUNT', sequelize.col('paymentStatus')), 'count'],
        ],
        group: ['paymentStatus'],
      }),
    ]);

    // Send analytics data in the response
    res.status(200).json({
      message: 'Admin analytics data retrieved successfully',
      data: {
        totalItems,
        totalBids,
        successfulTransactions,
        paymentStatusCount,
      },
    });
  } catch (error) {
    console.error('Error getting admin analytics:', error);
    res.status(500).json({
      message: 'Error fetching admin analytics data',
      error: error.message,
    });
  }
};

module.exports = { getAdminAnalytics };
