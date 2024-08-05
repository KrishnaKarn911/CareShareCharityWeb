const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/register', userController.register );

router.post('/register', userController.createUser);


router.get('/login', userController.loginPage);
router.post('/login', userController.login);

router.get('/userProfile', userController.getProfilePage)
// router.post('/login', authController.login);
// router.get('/profile', authMiddleware, authController.getProfile);
// router.put('/profile', authMiddleware, authController.updateProfile);

module.exports = router;