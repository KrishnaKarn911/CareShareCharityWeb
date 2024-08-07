const express = require('express');
const router = express.Router();
const charityController = require('../controllers/charityController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/register', charityController.getRegisterCharityPage)


router.get('/login', charityController.getCharityLoginPage )
router.post('/login', charityController.loginCharity);


router.get('/profile', charityController.getCharityProfilePage);
router.get('/charityDetails', authMiddleware.charityAuthorisation, charityController.getCharityDetails);

router.get('/donations',authMiddleware.charityAuthorisation, charityController.getCharityDonations );

//Getting approved and pending charities to show for admin
router.get('/', charityController.getCharities);
router.get('/pending', charityController.getPendingCharities);



// router.get('/pending', authMiddleware, charityController.getPendingCharities);
// router.put('/:id/approve', authMiddleware, charityController.updateCharityStatus);

module.exports = router;
