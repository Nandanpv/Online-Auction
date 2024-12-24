// // src/controllers/analyticsController.js
// const Item = require('../models/Item');
// const Bid = require('../models/Bid');
// const Transaction = require('../models/Transaction');

// Get auction analytics
// const getAnalytics = async (req, res) => {
//   try {
//     // Total number of items
//     const totalItems = await Item.count();

//     // Total number of bids placed
//     const totalBids = await Bid.count();

//     // Total number of successful transactions
//     const successfulTransactions = await Transaction.count({
//       where: { paymentStatus: 'Completed' },
//     });

//     // Payment status breakdown (Completed, Pending, Failed)
//     const paymentStatusCount = await Transaction.findAll({
//       attributes: ['paymentStatus', [sequelize.fn('COUNT', sequelize.col('paymentStatus')), 'count']],
//       group: ['paymentStatus'],
//     });

//     // Sending the collected analytics data as a response
//     res.status(200).json({
//       totalItems,
//       totalBids,
//       successfulTransactions,
//       paymentStatusCount,
//     });
//   } catch (error) {
//     console.error('Error getting analytics:', error);
//     res.status(500).json({ message: 'Error fetching analytics data', error: error.message });
//   }
// };

// module.exports = { getAnalytics };


//  const getAnalytics = async (req, res) => {
//    try {
//     const [
//       totalItems,
//       totalBids,
//       successfulTransactions,
//       paymentStatusCount,
//     ] = await Promise.all([
//       Item.count(),
//       Bid.count(),
//       Transaction.count({ where: { paymentStatus: 'Completed' } }),
//       Transaction.findAll({
//         attributes: ['paymentStatus', [sequelize.fn('COUNT', sequelize.col('paymentStatus')), 'count']],
//         group: ['paymentStatus'],
//       }),
//     ]);

//     res.status(200).json({
//       totalItems,
//       totalBids,
//       successfulTransactions,
//       paymentStatusCount,
//     });
//   } catch (error) {
//     console.error('Error getting analytics:', error);
//     res.status(500).json({ message: 'Error fetching analytics data', error: error.message });
//   }
// };

// module.exports = { getAnalytics};
    // src/controllers/analyticsController.js

const Item = require('../models/Item');
const Bid = require('../models/Bid');
const Transaction = require('../models/Transaction');
const sequelize = require('sequelize'); // Ensure Sequelize is correctly imported

// Handler to get analytics data
const getAnalytics = async (req, res) => {
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
      totalItems,
      totalBids,
      successfulTransactions,
      paymentStatusCount,
    });
  } catch (error) {
    console.error('Error getting analytics:', error);
    res.status(500).json({
      message: 'Error fetching analytics data',
      error: error.message,
    });
  }
};

// Export the function
module.exports = { getAnalytics };
