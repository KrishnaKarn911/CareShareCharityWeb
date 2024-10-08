const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/register', userController.register );

router.post('/register', userController.createUser);


router.get('/login', userController.loginPage);
router.post('/login', userController.login);

router.get('/profileData', authMiddleware.userAuthorisation,userController.getUserProfile)
router.get('/profile', userController.getProfilePage);

router.get('/', authMiddleware.userAuthorisation, userController.getAllUsers )
router.get('/donations',authMiddleware.userAuthorisation, userController.getUserDonations);


router.post('/createOrder',authMiddleware.userAuthorisation, userController.createOrder );
router.post('/updateDonation',authMiddleware.userAuthorisation, userController.updateDonation);

router.delete('/:id',authMiddleware.userAuthorisation, userController.deleteUser);
// router.post('/login', authController.login);
// router.get('/profile', authMiddleware, authController.getProfile);
// router.put('/profile', authMiddleware, authController.updateProfile);

module.exports = router;