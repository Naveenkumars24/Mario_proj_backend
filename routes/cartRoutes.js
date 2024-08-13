const cartController = require('../controllers/cartController');
const express = require('express');
const router =  express.Router();
const auth = require('../middleware/auth');

router.post('/new',auth,cartController.createCart);
router.get('/show',auth,cartController.getCart);
router.delete('/delete/:id',auth,cartController.deleteCart);

module.exports = router;