const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/donate', authMiddleware, donationController.donate);
router.get('/history', authMiddleware, donationController.getDonationHistory);

module.exports = router;
