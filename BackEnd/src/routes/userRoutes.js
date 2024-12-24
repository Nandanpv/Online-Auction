// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');

// router.post('/', userController.registerUser );
// router.get('/', userController.getAllUsers);
// router.get('/:id', userController.getUserById);
// router.put('/:id', userController.updateUser );
// router.delete('/:id', userController.deleteUser );
// router.post('/refresh', userController.refreshToken);



// // Get a user by ID


// //module.exports = router; // Ensure this line is presen
// module.exports = { registerUser, getAllUsers, getUserById, updateUser, deleteUser,refreshToken };

// Import required modules
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define routes
router.post('/register', userController.registerUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.post('/refresh-token', userController.refreshToken);

// Export the router
module.exports = router;