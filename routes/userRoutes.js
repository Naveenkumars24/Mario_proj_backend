const userController = require('../controllers/userController');

const express = require('express');
// const { route } = require('./productRoutes');
const router = express.Router();

router.get('/',userController.getUser);
router.post('/signup',userController.signUpUser);
router.post('/login',userController.loginUser);

module.exports = router;