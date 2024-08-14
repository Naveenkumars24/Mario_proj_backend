const userController = require('../controllers/userController');

const express = require('express');
// const { route } = require('./productRoutes');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/',auth,userController.getUser);
router.post('/signup',userController.signUpUser);
router.post('/login',userController.loginUser);

module.exports = router;