const Transaction = require('../models/Transaction');
const Item = require('../models/Item');
// Import Stripe (or another payment gateway)
const stripe = require('stripe')('your_stripe_secret_key'); // Replace with your actual secret key

const processPayment = async (req, res) => {
  const { transactionId, amount, currency, paymentMethodId } = req.body;

  try {
    // Validate input
    if (!transactionId) {
      return res.status(400).json({ error: 'Transaction ID is required' });
    }

    if (!amount || !currency || !paymentMethodId) {
      return res.status(400).json({ error: 'Missing payment details' });
    }

    // Find the transaction
    const transaction = await Transaction.findByPk(transactionId);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    if (transaction.paymentStatus === 'Completed') {
      return res.status(400).json({ error: 'Payment already completed for this transaction' });
    }

    // Process payment via Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency,
      payment_method: paymentMethodId,
      confirm: true, // Automatically confirm the payment
    });

    if (paymentIntent.status === 'succeeded') {
      // Update transaction status
      transaction.paymentStatus = 'Completed';
      await transaction.save();

      // Update item status
      const item = await Item.findByPk(transaction.itemId);
      if (item) {
        item.status = 'Sold';
        await item.save();
      }

      // Respond with success
      return res.status(200).json({
        message: 'Payment processed successfully',
        transaction,
        paymentIntent,
      });
    } else {
      // Handle payment failure
      transaction.paymentStatus = 'Failed';
      await transaction.save();

      return res.status(400).json({
        error: 'Payment failed',
        transaction,
        paymentIntent,
      });
    }
  } catch (error) {
    console.error('Payment processing error:', error);

    // Handle Stripe errors or other issues
    if (error.type === 'StripeCardError') {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({
      error: 'Payment processing failed',
      details: error.message,
    });
  }
};
module.exports = { processPayment };

