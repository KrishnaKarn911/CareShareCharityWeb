


const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware=require('./../middleware/authMiddleware');

// Route to approve a charity
router.get('/profile', adminController.getProfilePage);
router.post('/approveCharity/:id', adminController.approveCharity);

// Route to reject a charity
router.post('/rejectCharity/:id', adminController.rejectCharity);
router.get('/allDonations', authMiddleware.userAuthorisation, adminController.getAllOrders);

module.exports = router;

