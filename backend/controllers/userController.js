const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtSecret = process.env.JWT_SECRET;

const register = async (req, res) => {
  try {
    // Step 1: Receive User Data
    const { username, email, password } = req.body;

    // Step 2: Validate User Input
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields." });
    }

    // Step 3: Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 4: Create User
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    // Step 5: Generate JWT
    const token = jwt.sign({ userId: savedUser._id }, jwtSecret, {
      expiresIn: "1h",
    });

    // Step 6: Send Response
    res.json({
      token,
      user: { id: savedUser._id, username: savedUser.username },
    });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    // Step 1: Receive User Data
    const { email, password } = req.body;

    // Step 2: Validate User Input
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide both email and password." });
    }

    // Step 3: Find User by Email
    const user = await User.findOne({ email });

    // Step 4: Verify User and Password
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Step 5: Generate JWT
    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "1h",
    });

    // Step 6: Send Response
    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const protected = async (req, res) => {
  try {
    if (req.user) {
      res.status(200).json({ message: "You are authorized" });
    } else {
      res.status(401).json({ message: "You are not authorized" });
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const details = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const update = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findById(req.user.userId);
//if exist then update hash the password and update
    if (username) {
      user.username = username;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
const deleteUser = async  (req, res) => {
  try {
    const user = await User.findOneAndDelete(req.user.userId);
   
    res.status(200).json(user);
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
const addCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    //add to cart
    const user = await User.findById(req.user.userId);
    //validate data
    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields." });
    }
    user.cart.push({
      productId,
      quantity,
    });
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.status(200).json(user.cart);
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
const updateCart = async (req, res) => {
 try {
  const { productId, quantity,cartId } = req.body;
  const user = await User.findById(req.user.userId);
//if exist then update
  if (productId) {
    user.cart.id(cartId).productId = productId;
  }
  if (quantity) {
    user.cart.id(cartId).quantity = quantity;
  }
  await user.save();
  res.status(200).json(user);
 } catch (error) {
  console.error("Error during login:", error.message);
  res.status(500).json({ error: "Internal Server Error" });
 } 
}
const deleteCart = async (req, res) => {
  try {
    const { cartId } = req.body;
    const user = await User.findById(req.user.userId);

    // Filter out the item to be deleted from the user's cart
    const updatedCart = user.cart.filter((item) => item._id !== cartId);

    // Update the user's cart with the filtered cart
    user.cart = updatedCart;
    
    // Save the updated user object
    await user.save();

    res.status(200).json({ message: 'Item removed from the cart successfully', updatedCart });
  } catch (error) {
    console.error("Error during cart item deletion:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addShipping = async (req, res) => {
  try {
    const { address, city, postalCode, country } = req.body;
    const user = await User.findById(req.user.userId);
    //validate data
    if (!address || !city || !postalCode || !country) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields." });
    }
    user.shippingAddress.push({
      address,
      city,
      postalCode,
      country,
    });
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getShipping = async (req, res) => {
  try {
    // Assuming you have the user ID available in req.user.userId
    const userId = req.user.userId;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get the shipping information from the user's profile
    const shippingInfo = user.shippingInfo;

    // Check if shipping information exists
    if (!shippingInfo) {
      return res.status(404).json({ error: 'Shipping information not found' });
    }

    res.status(200).json({ shippingInfo });
  } catch (error) {
    console.error("Error getting shipping information:", error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateShipping = async (req, res) => {
  try {
    const { shippingAddressId, updatedAddress } = req.body;
    const userId = req.user.userId;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the shipping address by ID
    const existingShippingAddress = user.shippingAddress.find(
      (address) => address._id.toString() === shippingAddressId
    );

    if (existingShippingAddress) {
      // If the shipping address exists, update it
      existingShippingAddress.address = updatedAddress.address || existingShippingAddress.address;
      existingShippingAddress.city = updatedAddress.city || existingShippingAddress.city;
      existingShippingAddress.postalCode = updatedAddress.postalCode || existingShippingAddress.postalCode;
      existingShippingAddress.country = updatedAddress.country || existingShippingAddress.country;

      // Save the updated user object
      await user.save();

      return res.status(200).json({
        message: "Shipping address updated successfully",
        updatedShippingAddress: existingShippingAddress,
      });
    }

    res.status(404).json({ error: "Shipping address not found" });
  } catch (error) {
    console.error("Error updating shipping address:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete shipping information
const deleteShipping = async (req, res) => {
  try {
    const { shippingAddressId } = req.params;
    const userId = req.user.userId;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Filter out the shipping address to be deleted from the user's shippingAddress array
    const updatedShippingAddresses = user.shippingAddress.filter(
      (address) => address._id.toString() !== shippingAddressId
    );

    // Update the user's shippingAddress with the filtered shipping addresses
    user.shippingAddress = updatedShippingAddresses;

    // Save the updated user object
    await user.save();

    res.status(200).json({
      message: "Shipping address removed successfully",
      updatedShippingAddresses,
    });
  } catch (error) {
    console.error("Error during shipping address deletion:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Create order
const addOrder = async (req, res) => {
  try {
    const { productId, quantity, shippingAddressId } = req.body;
    const userId = req.user.userId;

    // Find the user by ID
    const user = await User.findById(userId);

    // Validate data
    if (!productId || !quantity || !shippingAddressId) {
      return res.status(400).json({ error: "Please provide all required fields." });
    }

    // Add a new order to the orders array
    user.orders.push({ productId, quantity, shippingAddressId });

    // Save the updated user object
    await user.save();

    res.status(200).json({ message: "Order added successfully", user });
  } catch (error) {
    console.error("Error adding order:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Read orders
const getOrders = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const orders = user.orders;

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update order (Assuming you have a unique order ID)
const updateOrder = async (req, res) => {
  try {
    const { orderId, updatedQuantity } = req.body;
    const userId = req.user.userId;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the order by ID
    const order = user.orders.find((o) => o._id.toString() === orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Update the order quantity
    order.quantity = updatedQuantity;

    // Save the updated user object
    await user.save();

    res.status(200).json({ message: "Order updated successfully", updatedOrder: order });
  } catch (error) {
    console.error("Error updating order:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete order (Assuming you have a unique order ID)
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.userId;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Filter out the order to be deleted from the user's orders array
    const updatedOrders = user.orders.filter((o) => o._id.toString() !== orderId);

    // Update the user's orders with the filtered orders
    user.orders = updatedOrders;

    // Save the updated user object
    await user.save();

    res.status(200).json({ message: "Order deleted successfully", updatedOrders });
  } catch (error) {
    console.error("Error during order deletion:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  register,
  login,
  protected,
  details,
  update,
  deleteUser,
  addCart,
  getCart,
  updateCart,
  deleteCart,
  addShipping,
  getShipping,
  updateShipping,
  deleteShipping,
  addOrder,
  getOrders,
  updateOrder,
  deleteOrder,
};