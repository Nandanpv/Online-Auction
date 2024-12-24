// src/utils/jwtUtil.js
const jwt = require('jsonwebtoken');

// Secret key for signing JWT tokens
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Ideally, this should be stored in an environment variable

// Function to generate a JWT token
function generateToken(user) {
  // Create payload with user information (you can add more info here)
  const payload = {
    id: user.id,
    email: user.email
  };

  // Create a JWT token with the payload, secret, and an expiration time
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour
  return token;
}

// Function to verify JWT token
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    return decoded; // Return the decoded payload if valid
  } catch (error) {
    return null; // Return null if the token is invalid
  }
}

module.exports = { generateToken, verifyToken };
