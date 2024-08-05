const express = require('express');
const router = express.Router();
const charityController = require('../controllers/charityController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/register', charityController.getRegisterCharityPage)
//router.post('/register', charityController.createCharity);
router.get('/', charityController.getCharities);
// router.get('/pending', authMiddleware, charityController.getPendingCharities);
// router.put('/:id/approve', authMiddleware, charityController.updateCharityStatus);

module.exports = router;
