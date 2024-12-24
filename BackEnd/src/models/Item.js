const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User'); // assuming User model is already defined

const Item = sequelize.define('Item', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  startingPrice: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

// Item belongs to User (assuming the item is created by a user)
Item.belongsTo(User);

module.exports = Item;
