// Import models

const User = require('./User'); // Ensure correct path and casing
const Admin = require('./Admin'); // Ensure correct path and casing
const Item = require('./Item'); 
const Bid = require('./Bid'); 
const Category = require('./Category'); 
const Transaction = require('./Transaction');
const Notification = require('./Notification');

// Relationships setup code

// Define associations between models

// User-Item Relationship: One user can create many items (1:N)
User.hasMany(Item, { as: 'createdItems' });
Item.belongsTo(User, { as: 'creator' });

// Admin-Item Relationship: One admin can manage many items (1:N)
Admin.hasMany(Item, { as: 'managedItems' });
Item.belongsTo(Admin, { as: 'manager' });

// Item-Bid Relationship: One item can have many bids (1:N)
Item.hasMany(Bid, { as: 'Bids' });
Bid.belongsTo(Item, { as: 'Item' });

// User-Bid Relationship: One user can place many bids (1:N)
User.hasMany(Bid, { as: 'placedBids' });
Bid.belongsTo(User, { as: 'bidder' });

// Item-Category Relationship: One item belongs to one category (N:1)
Item.belongsTo(Category, { as: 'category' });
Category.hasMany(Item, { as: 'items' });

// User-Transaction Relationship: One user can have many transactions (1:N)
User.hasMany(Transaction, { as: 'transactions' });
Transaction.belongsTo(User, { as: 'user' });

// Admin-Transaction Relationship: One admin can manage many transactions (1:N)
Admin.hasMany(Transaction, { as: 'managedTransactions' });
Transaction.belongsTo(Admin, { as: 'admin' });

User.hasMany(Notification, { foreignKey: 'userId', onDelete: 'CASCADE' });
Notification.belongsTo(User, { foreignKey: 'userId' });
