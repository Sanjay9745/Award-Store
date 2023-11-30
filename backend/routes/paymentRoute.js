const express = require("express");
const router = express.Router();


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

router.post("/create-checkout-session", userAuth, async (req, res) => {
    const user = await User.findById(req.user.id);
    const items = user.cart;
    if(!user){
        return res.status(404).json({msg: "User not found"})
    }
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: items.map((item) => {

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
              },
              unit_amount: item.price*item.quantity,
            },
            quantity: item.quantity,
          };
        }),
        mode: "payment",
        success_url: process.env.DOMAIN+"/success",
        cancel_url: process.env.DOMAIN+"/cancel",
      });
    
      res.json({url: session.url});
})

const endpointSecret = "whsec_oku4TYupVHfiIADnn0Qf3nBYPKpjJqym";

router.post('/webhooks', express.raw({type: 'application/json'}), (request, response) => {
console.log(request.body.type);

const event = request.body;
  // Handle the event

  switch (event.type) {
    case 'checkout.session.async_payment_failed':
      const checkoutSessionAsyncPaymentFailed = event.data.object;
      // Then define and call a function to handle the event checkout.session.async_payment_failed
      console.log(checkoutSessionAsyncPaymentFailed);
      break;
    case 'checkout.session.async_payment_succeeded':
      const checkoutSessionAsyncPaymentSucceeded = event.data.object;
      console.log(checkoutSessionAsyncPaymentSucceeded);
      // Then define and call a function to handle the event checkout.session.async_payment_succeeded
      break;
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      // Then define and call a function to handle the event checkout.session.completed
      console.log(checkoutSessionCompleted);
      break;
      case  "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      console.log(paymentIntent);
      break;
    // ... handle other event types
    default:

      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.json({received: true});
})


router.get("/success", (req, res) => {

  res.send("success");
});

router.get("/cancel", (req, res) => {
  res.send("cancel");
});

module.exports = router;