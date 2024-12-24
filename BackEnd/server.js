// const express = require('express');
// const dotenv = require('dotenv');
// const { Sequelize } = require('sequelize');
// require('./src/models/relationship'); // Initialize model relationships

// // Import Routes
// const userRoutes = require('./src/routes/userRoutes');
// const adminRoutes = require('./src/routes/adminRoutes');
// const itemRoutes = require('./src/routes/itemRoutes');
// const bidRoutes = require('./src/routes/bidRoutes');
// const paymentRoutes = require('./src/routes/paymentRoutes');
// const analyticsRoutes = require('./src/routes/analyticsRoutes'); // Analytics routes
// const adminAnalyticsRoutes = require('./src/routes/adminAnalyticsRoutes'); // Admin-specific analytics routes
// const transactionRoutes = require('./src/routes/transactionRoutes'); 
// dotenv.config();
// const app = express();
// app.use(express.json());

// // Load environment variables
// const PORT = process.env.PORT || 5000;

// // Initialize Sequelize
// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST || 'localhost',
//     dialect: 'mysql',
//     logging: false, // Set to true for debugging SQL queries
//   }
// );

// // Test database connection and sync models
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Database connected successfully');
//     return sequelize.sync({ alter: true });
//   })
//   .then(() => {
//     console.log('Database & tables synced!');

//     // Register routes
//     app.use('/api/users', userRoutes);
//     app.use('/api/admins', adminRoutes);
//     app.use('/api/items', itemRoutes);
//     app.use('/api/bids', bidRoutes);
//     app.use('/api/payments', paymentRoutes);
//     app.use('/api/admin/analytics', analyticsRoutes); // Admin analytics
//     app.use('/api/admins/analytics', adminAnalyticsRoutes); // Dedicated analytics routes for admins
//     app.use('/api/transactions', transactionRoutes); 
//     // Error handling middleware
//     app.use((err, req, res, next) => {
//       console.error('Error:', err.stack);
//       res.status(500).json({
//         message: 'Internal Server Error',
//         error: err.message,
//       });
//     });

//     // Start the server
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error('Error syncing database:', error);
//     process.exit(1); // Exit on error
//   });
//console.log('Starting server.js'); 
  const express = require('express');
 // const PORT = 5000;
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
require('./src/models/relationship'); // Initialize model relationships

// Import Routes
const userRoutes = require('./src/routes/userRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const itemRoutes = require('./src/routes/itemRoutes');
const bidRoutes = require('./src/routes/bidRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const analyticsRoutes = require('./src/routes/analyticsRoutes'); // Analytics routes
const adminAnalyticsRoutes = require('./src/routes/adminAnalyticsRoutes'); // Admin-specific analytics routes
const transactionRoutes = require('./src/routes/transactionRoutes'); 
const notificationRoutes = require('./src/routes/notificationRoutes'); 

dotenv.config();
const app = express();
app.use(express.json());

// Load environment variables
const {  PORT,DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

// Initialize Sequelize
const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  {
    host: DB_HOST || 'localhost',
    dialect: 'mysql',
    logging:false, // Set to true for debugging SQL queries
  }
);

// Test database connection and sync models
async function initDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
    await sequelize.sync({ alter: true });
    console.log('Database & tables synced!');
  } catch (error) {
    console.error('Error syncing database:', error);
    process.exit(1); // Exit on error
  }
}

// Register routes
function registerRoutes() {
  app.use('/api/users', userRoutes);
  app.use('/api/admins', adminRoutes);
  app.use('/api/items', itemRoutes);
  app.use('/api/bids', bidRoutes);
  app.use('/api/payments', paymentRoutes);
  app.use('/api/admin/analytics', analyticsRoutes);
  app.use('/api/admins/analytics', adminAnalyticsRoutes);
  app.use('/api/transactions', transactionRoutes);
  app.use('/api/notifications', notificationRoutes); 
}


// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message,
  });
});

// Start the server
console.log('Starting server.js'); // Add this at the top of the file

// Inside the startServer function
async function startServer() {
  try {
    //console.log('Initializing database...');
    await initDatabase();
    //console.log('Registering routes...');
    registerRoutes();
   // console.log('Starting server...');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

(async function main() {
  console.log('Executing main function');
  await startServer();
})();
