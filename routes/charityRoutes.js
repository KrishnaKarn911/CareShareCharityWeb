const express = require('express');
const router = express.Router();
const charityController = require('../controllers/charityController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/register', charityController.getRegisterCharityPage)
router.get('/login', charityController.getCharityLoginPage )


router.post('/login', charityController.loginCharity);


router.get('/profile', charityController.getCharityProfilePage);


//Getting approved and pending charities
router.get('/', charityController.getCharities);
router.get('/pending', charityController.getPendingCharities);


router.get('/charityDetails', authMiddleware.charityAuthorisation, charityController.getCharityDetails);
// router.get('/pending', authMiddleware, charityController.getPendingCharities);
// router.put('/:id/approve', authMiddleware, charityController.updateCharityStatus);

module.exports = router;
