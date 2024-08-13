const productController = require('../controllers/productController')

const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/",productController.getProducts);
router.post("/",productController.postProducts);
router.delete("/:id",productController.deleteProducts);
router.put("/:id",productController.putProducts);
router.patch("/:id",productController.patchProducts);


module.exports = router;