const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const userAuth = require('../middleware/userAuth');

router.get('/protected', userAuth, userController.protected);
router.get('/details', userAuth, userController.details);
router.get('/cart', userAuth, userController.getCart);
router.get('shipping',userAuth,userController.getShipping)

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/cart', userAuth, userController.addCart);
router.post('/shipping', userAuth, userController.addShipping);
router.post('/orders', userAuth, userController.addOrder);


//update
router.put('/update', userAuth, userController.update);
router.put('/updateCart', userAuth, userController.updateCart);
router.put('/updateShipping', userAuth, userController.updateShipping);
router.put('/updateOrders', userAuth, userController.updateOrder);

//delete

router.delete('/delete', userAuth, userController.deleteUser);
router.delete('/deleteCart/:cartId', userAuth, userController.deleteCart);
router.delete('/deleteShipping/:shippingAddressId ', userAuth, userController.deleteShipping);
router.delete('/deleteOrders/:orderId', userAuth, userController.deleteOrder);

module.exports = router;