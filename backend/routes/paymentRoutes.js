const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const userAuth = require('../middleware/userAuth');
// Helper function to calculate the total price
function calculateTotalPrice(items) {
    let totalPrice = 0;
    for (const item of items) {
      const product = products.find((p) => p.id === item.id);
      if (product) {
        totalPrice += product.price * item.quantity;
      }
    }
    return totalPrice;
  }

const User = require("../models/User");
const Product = require("../models/Products");

router.post("/create-checkout-session", userAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const items = user.cart;
    const itemIds = items.map((item) => item.productId);

    const populatedItems = await Product.find({ _id: { $in: itemIds } });

    const itemsWithQuantity = items.map((item) => {
      const correspondingProduct = populatedItems.find((product) => String(product._id) === item.productId);

      if (!correspondingProduct) {
        return null; // Handle the case when the product is not found
      }

      return {
        ...correspondingProduct.toObject(),
        quantity: item.quantity,
      };
    });

    const validItemsWithQuantity = itemsWithQuantity.filter((item) => item !== null);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: validItemsWithQuantity.map((item) => {
        return {
          price_data: {
            currency: "inr", // Change currency to Indian Rupee (INR)
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * item.quantity * 100, // Convert to paisa (Stripe expects amount in the smallest currency unit)
          },
          quantity: item.quantity,
        };
      }),
      mode: "payment",
      success_url: process.env.DOMAIN + "/api/payment/success",
      cancel_url: process.env.DOMAIN + "/api/payment/cancel",
      billing_address_collection: "auto", // Remove billing address collection
      metadata: {
        userId: req.user.userId, // Include userId in metadata
        items: JSON.stringify(items), // Include items in metadata (adjust format as needed)
      },
    });

    res.json({ url: session.url, userId: req.user.userId, items: validItemsWithQuantity });
  } catch (error) {
    console.error("Error creating checkout session:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const endpointSecret = "whsec_AoteIPsAFUGMNmJJtzjQ8pEd2NhrZYTy";

router.post('/webhooks', express.raw({ type: 'application/json' }), (request, response) => {
  console.log(request.body.type);

  const event = request.body;

  // Handle the event
  switch (event.type) {
    case 'checkout.session.async_payment_failed':
      const checkoutSessionAsyncPaymentFailed = event.data.object;
      console.log(checkoutSessionAsyncPaymentFailed);
      break;
    case 'checkout.session.async_payment_succeeded':
      const checkoutSessionAsyncPaymentSucceeded = event.data.object;
      // console.log(checkoutSessionAsyncPaymentSucceeded);
      break;
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;

      // Access metadata to get userId and items
      const userId = checkoutSessionCompleted.metadata.userId;
      const items = JSON.parse(checkoutSessionCompleted.metadata.items);

      // Now you have userId and items available for further processing
      console.log(userId, items);
    User.findById(userId).then((user)=>{
      //make cart empty
      user.cart=[];
      //add orders
      user.orders.push({
        products:items,
        price:checkoutSessionCompleted.amount_total,
        shippingAddress:user.shippingAddress,
        date:Date.now(),
        status:"ordered"
      })
      //save user
      user.save().then(()=>{
        console.log("user saved");
      }).catch((err)=>{
        console.log(err);

      });
    })
      // Then define and call a function to handle the event checkout.session.completed
      console.log(checkoutSessionCompleted);
      break;
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // console.log(paymentIntent);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.json({ received: true });
});


router.get("/success", (req, res) => {
  
  res.redirect("/orders");
});

router.get("/cancel", (req, res) => {
  res.redirect("/orders");
});

module.exports = router;