const Item = require('../models/Item');

const createItem = async (req, res) => {
  const { name, description, startingPrice, endTime, image } = req.body;
  
  try {
    // Make sure required fields are present
    if (!name || !startingPrice || !endTime) {
      return res.status(400).json({ message: 'Name, startingPrice, and endTime are required.' });
    }

    // Create the item
    const newItem = await Item.create({
      name,
      description,
      startingPrice,
      endTime,
      image,
      userId: req.user.id // Assuming the logged-in user's ID is stored in `req.user`
    });

    res.status(201).json({
      message: 'Item created successfully',
      item: newItem
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating item', error });
  }
};

module.exports = { createItem };
