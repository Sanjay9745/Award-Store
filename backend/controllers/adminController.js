const User = require("../models/User");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Product = require("../models/Products");
const jwtSecret = process.env.JWT_ADMIN_SECRET;

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
        return res
            .status(400)
            .json({ error: "Please provide all required fields." });
        }
        const user = await Admin.findOne({ email });
        if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
        }
        const payload = {
        user: {
            id: user._id,
        },
        };
        jwt.sign(payload, jwtSecret, { expiresIn: "1h" }, (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
        });
    } catch (error) {
        console.error("Error logging in admin:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
//remove this after creating admin
const adminRegister = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
        return res
            .status(400)
            .json({ error: "Please provide all required fields." });
        }
        const user = await Admin.findOne({ email });
        if (user) {
        return res.status(400).json({ error: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await Admin.create({
        email,
        password: hashedPassword,
        });
        const payload = {
        user: {
            id: newUser._id,
        },
        };
        jwt.sign(payload, jwtSecret, { expiresIn: "1h" }, (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
        });
    } catch (error) {
        console.error("Error registering admin:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
const getUser = async (req, res) => {
    const { id } = req.params.id;
    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        console.error("Error getting user:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getAllUsers = async (req, res) => {
    try {
      // Extract page and perPage from query parameters (default values are set)
      const page = parseInt(req.query.page, 10) || 1;
      const perPage = parseInt(req.query.perPage, 10) || 10;
  
      // Calculate the skip value to skip the appropriate number of documents
      const skip = (page - 1) * perPage;
  
      // Find users with pagination
      const users = await User.find({})
        .skip(skip)
        .limit(perPage);
  
      res.status(200).json(users);
    } catch (error) {
      console.error("Error getting all users:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete(req.params.id);
        res.status(200).json({ msg: "User removed" });
    } catch (error) {
        console.error("Error deleting user:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


const getOrders = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const orders = user.orders || [];
  
      const newOrders = await Promise.all(
        orders.map(async (order) => {
          const products = await Promise.all(
            order.products.map(async (item) => {
              const product = await Product.findById(item.productId);
              if (!product) {
                // Handle the case when the product is not found
                // You might want to skip it or send an error response
                return null;
              }
  
              return {
                product,
                quantity: item.quantity,
                price: order.price,
                status: order.status,
                date: order.date,
                shippingAddress: order.shippingAddress,
              };
            })
          );
  
          // Filter out null values if any product is not found
          const validProducts = products.filter((item) => item !== null);
  
          return validProducts;
        })
      );
  
      // Flatten the array of arrays into a single array
      const flattenedOrders = newOrders.flat();
  
      res.status(200).json(flattenedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  const getAllOrders = async (req, res) => {
    try {
      const users = await User.find({}); // Retrieve all users
  
      const allOrders = await Promise.all(
        users.map(async (user) => {
          const orders = user.orders || [];
  
          const userOrders = await Promise.all(
            orders.map(async (order) => {
              const products = await Promise.all(
                order.products.map(async (item) => {
                  const product = await Product.findById(item.productId);
                  if (!product) {
                    // Handle the case when the product is not found
                    // You might want to skip it or send an error response
                    return null;
                  }
  
                  return {
                    product,
                    quantity: item.quantity,
                    price: order.price,
                    status: order.status,
                    date: order.date,
                    shippingAddress: order.shippingAddress,
                    name:user.username,
                    email:user.email,
                    
                  };
                })
              );
  
              // Filter out null values if any product is not found
              const validProducts = products.filter((item) => item !== null);
  
              return validProducts;
            })
          );
  
          // Flatten the array of arrays into a single array
          const userFlattenedOrders = userOrders.flat();
          return userFlattenedOrders;
        })
      );
  
      // Flatten the array of arrays into a single array
      const flattenedOrders = allOrders.flat();
  
      res.status(200).json(flattenedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

module.exports = {
    adminLogin,
    adminRegister,
    getAllUsers,
    getUser,
    deleteUser,
    getAllOrders,
    getOrders,

}
