

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Route to approve a charity
router.get('/profile', adminController.getProfilePage);
router.post('/approveCharity/:id', adminController.approveCharity);

// Route to reject a charity
router.post('/rejectCharity/:id', adminController.rejectCharity);

module.exports = router;

