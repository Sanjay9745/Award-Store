// userModel.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
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
  orders:Array,
    shippingAddress: {
      address: String,
      city: String,
      postalCode: String,
      phoneNumber: String,
      apartment: String,
      name: String,
      state: String,
    },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  verified:{
    type:Boolean,
    default:false,
  },
  otp:{
    type:String,
    default:""
  
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
