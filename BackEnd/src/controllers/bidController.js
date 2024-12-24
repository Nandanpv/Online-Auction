// src/controllers/bidController.js
const Bid = require('../models/Bid');
const Item = require('../models/Item');

// Place a bid on an auction item
const placeBid = async (req, res) => {
  console.log('Req user:', req.user); // Debugging step
  console.log('Req body:', req.body); // Debugging step

  const { itemId, amount } = req.body;

  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const userId = req.user.id;

    if (!itemId || !amount) {
      return res.status(400).json({ message: 'Item ID and bid amount are required' });
    }

    // Check if the item exists
    const item = await Item.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if the bid is higher than the current bid
    if (amount <= item.currentBid) {
      return res.status(400).json({ message: 'Bid must be higher than the current bid' });
    }

    // Create the new bid
    const newBid = await Bid.create({
      userId,
      itemId,
      amount,
    });

    // Update the current bid for the item
    item.currentBid = amount;
    await item.save();

    res.status(201).json({
      message: 'Bid placed successfully',
      bid: newBid,
    });
  } catch (error) {
    console.error('Error placing bid:', error); // Debugging step
    res.status(500).json({ message: 'Error placing bid', error: error.message });
  }
};

module.exports = { placeBid };
