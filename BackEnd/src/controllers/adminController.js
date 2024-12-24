const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Bid = require('../models/Bid');
const Transaction = require('../models/Transaction');
const Item = require('../models/Item');
const User = require('../models/User');
const models = require('../models/Admin'); // Assuming sequelize is set up in your models

// Register a new admin
const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin
    const newAdmin = await Admin.create({ name, email, password: hashedPassword });
       console.log(newAdmin);
    res.status(201).json({ message: 'Admin registered successfully', admin: newAdmin });
  } catch (error) {
    console.error('Error registering admin:', error); // Log error for debugging
    res.status(500).json({ message: 'Error registering admin', error: error.stack || error.message });
  }
};

// Login an admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the admin by email
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in admin:', error);  // Log the full error stack for debugging
    res.status(500).json({ message: 'Error logging in', error: error.stack || error.message });
  }
};

// Get analytics for the admin dashboard
const getAnalytics = async (req, res) => {
  try {
    // Total number of bids
    const totalBids = await Bid.count();

    // Total number of transactions
    const totalTransactions = await Transaction.count();

    // Highest bid (based on bid amount)
    const highestBid = await Bid.findOne({
      order: [['amount', 'DESC']],
      include: [Item],
    });

    // Most active user (based on number of bids placed)
    const mostActiveUser = await Bid.findAll({
      attributes: ['userId', [sequelize.fn('COUNT', sequelize.col('userId')), 'totalBids']],
      group: ['userId'],
      order: [[sequelize.fn('COUNT', sequelize.col('userId')), 'DESC']],
      limit: 1,
    });

    // Most popular item (based on number of bids placed)
    const mostPopularItem = await Bid.findAll({
      attributes: ['itemId', [sequelize.fn('COUNT', sequelize.col('itemId')), 'totalBids']],
      group: ['itemId'],
      order: [[sequelize.fn('COUNT', sequelize.col('itemId')), 'DESC']],
      limit: 1,
    });

    res.status(200).json({
      totalBids,
      totalTransactions,
      highestBid,
      mostActiveUser,
      mostPopularItem,
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ message: 'Error fetching analytics', error: error.message });
  }
};

module.exports = { registerAdmin, loginAdmin, getAnalytics };
