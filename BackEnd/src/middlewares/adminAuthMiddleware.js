const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import User model if needed, but we aren't using it in this specific middleware.

const adminAuthMiddleware = (req, res, next) => {
  let token;

  // Check if the Authorization header is present and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using JWT and secret key from environment variables
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Optionally, you can check if the user exists in the database (uncomment if required)
      // const user = await User.findById(decoded.id);
      // if (!user) {
      //   return res.status(401).json({ message: 'User not found' });
      // }

      // Attach the decoded user data to the request object
      req.user = {
        id: decoded.id,
        email: decoded.email,
      };

      console.log('Decoded token:', decoded); // For debugging purposes

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error('JWT verification failed:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If no token is provided, respond with an error
  if (!token) {
    console.log('No token provided'); // Debugging step
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = adminAuthMiddleware;
