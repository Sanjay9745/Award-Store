const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const adminAuth = require("../middleware/adminAuth");

router.post('/login',adminController.adminLogin);
router.post('/register',adminController.adminRegister);
router.get('/user/:id',adminAuth,adminController.getUser);
router.get('/users',adminAuth,adminController.getAllUsers);    
router.get('/orders',adminAuth,adminController.getAllOrders);
router.get('/orders/:userId',adminAuth,adminController.getOrders);
router.delete('/delete-user/:id',adminAuth,adminController.deleteUser);


module.exports = router;
