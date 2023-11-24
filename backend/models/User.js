// userModel.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart:[
    {
      productId:String,
      quantity:Number,
    }
  ],
  orders:[
    {
      productId:String,
      quantity:Number,
      shippingAddressId:String,
    }],
    shippingAddress:[{
      address:String,
      city:String,
      postalCode:String,
      country:String,
    }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
