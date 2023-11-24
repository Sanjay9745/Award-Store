// orderModel.js

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId:String,
    productId:String,
    quantity:Number,
    createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
