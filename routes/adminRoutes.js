const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/users', authMiddleware, adminController.getUsers);
router.put('/user/:id/status', authMiddleware, adminController.updateUserStatus);

module.exports = router;
