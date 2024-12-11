// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import TrainingRoute from "./route/TrainingRoute.js"
// import UserRoute from "./route/UserRoute.js"
// import cors from "cors";
// import Stripe from 'stripe'; // Import the Stripe library


// const app = express();

// app.use(cors());

// dotenv.config();
// app.use(express.json());

// // Initialize Stripe with your secret key
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Make sure your secret key is in the .env file

// const PORT=process.env.PORT || 4001;

// //Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 30000 })
//   .then(() => console.log("MongoDB connection successful"))
//   .catch((error) => console.error("MongoDB connection error:", error));


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.use("/training", TrainingRoute)
// app.use("/user", UserRoute)

// // Create payment intent route
// app.post('/create-payment-intent', async (req, res) => {
//   try {
//     const { amount } = req.body; // Amount should be in cents (e.g., $10 = 1000 cents)

//     // Create the payment intent using Stripe's API
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount,
//       currency: 'usd', // Change to your desired currency
//       automatic_payment_methods: { enabled: true },
//     });

//     // Send the client secret back to the front-end
//     res.json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.error('Error creating payment intent:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is listining on port ${PORT}`)
// })


import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import TrainingRoute from "./route/TrainingRoute.js"
import UserRoute from "./route/UserRoute.js"
import cors from "cors";
import Stripe from 'stripe'; // Import the Stripe library


const app = express();

app.use(cors({
  origin: 'https://main.dh0jwa1gw9pgt.amplifyapp.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

dotenv.config();
app.use(express.json());

// Initialize Stripe with your secret key
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Make sure your secret key is in the .env file

const PORT=process.env.PORT || 4001;

//Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 30000 })
  .then(() => console.log("MongoDB connection successful"))
  .catch((error) => console.error("MongoDB connection error:", error));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/training", TrainingRoute)
app.use("/user", UserRoute)

// Create payment intent route
app.post('/create-checkout-session', async (req, res) => {
  const { cart } = req.body;  // Cart items from the frontend
  console.log(cart);

  try {
    // Map cart items to Stripe Checkout line items
    const line_items = cart.map((product) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.title,
          description: product.description,
          images: [product.image],
        },
        unit_amount: Math.round(product.price * 100),  // Price in cents
      },
      quantity: product.quantity || 1,  // Default to 1 if no quantity specified
    }));

    // Create the Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',  // Use 'payment' for one-time payments
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,  // Redirect to success page after payment
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,  // Redirect to cancel page if the payment is canceled
    });

    res.json({ id: session.id });  // Send session ID back to the frontend
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/success', async (req, res) => {                             //need to debug this one
  const { session_id } = req.query;

  try {
    // Fetch the checkout session using the session ID
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === 'paid') {
      res.json({
        success: true,
        message: "Payment successful!",
        sessionDetails: session, // Include additional session details
      });
    } else {
      // Payment not successful
      res.json({ success: false });
    }
  } catch (error) {
    console.error('Error verifying session:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listining on port ${PORT}`)
})