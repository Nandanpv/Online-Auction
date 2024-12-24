// src/controllers/notificationController.js
const Notification = require('../models/Notification');

// Get all notifications for a user
const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from JWT middleware
    const notifications = await Notification.findAll({ where: { userId }, order: [['createdAt', 'DESC']] });
    res.status(200).json({ notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Error fetching notifications', error: error.message });
  }
};

// Mark a notification as read
const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.body;

    const notification = await Notification.findByPk(notificationId);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.isRead = true;
    await notification.save();

    res.status(200).json({ message: 'Notification marked as read', notification });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ message: 'Error marking notification as read', error: error.message });
  }
};

module.exports = { getNotifications, markAsRead };
