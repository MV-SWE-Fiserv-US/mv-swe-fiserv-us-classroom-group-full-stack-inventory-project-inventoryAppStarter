const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

router.post("/", async (req, res) => {
  const { total } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
