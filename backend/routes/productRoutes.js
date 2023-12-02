const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const adminAuth = require("../middleware/adminAuth");

router.get("/all", productController.getAllProducts);
router.get("/single/:id", productController.getProductById);
router.post("/create",productController.createProduct);//add admin auth
router.put("/update/:id",adminAuth, productController.updateProduct);//add admin auth
router.delete("/delete/:id",adminAuth, productController.deleteProduct);//add admin auth

module.exports = router;
