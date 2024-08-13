const express = require('express');
const orderController  = require('../controllers/orderController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/makeOrder',auth,orderController.createOrder);
router.get('/showMyOrders',auth,orderController.getOrder);

module.exports = router;