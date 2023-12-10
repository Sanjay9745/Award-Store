const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const adminAuth = require("../middleware/adminAuth");

router.get('/user/:id',adminAuth,adminController.getUser);
router.get('/users',adminAuth,adminController.getAllUsers);    
router.get('/orders',adminAuth,adminController.getAllOrders);

router.post('/login',adminController.adminLogin);
// router.post('/register',adminController.adminRegister);//comment this route after creating admin
router.post('/update-order-status',adminAuth,adminController.updateOrderStatus);

router.get('/orders/:userId',adminAuth,adminController.getOrders);
router.delete('/delete-user/:id',adminAuth,adminController.deleteUser);


module.exports = router;
