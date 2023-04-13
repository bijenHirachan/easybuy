import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import { stripe, endpointSecret } from "../app.js";
import { Order } from "../models/Order.js";

export const createCheckoutSession = catchAsyncErrors(
  async (req, res, next) => {
    // console.log(req.body);
    const customer = await stripe.customers.create({
      metadata: {
        userId: req.body.user._id,
        cartItems: JSON.stringify(req.body.cartItems),
        total: req.body.totalPrice,
      },
    });

    const line_items = req.body.cartItems.map((item) => {
      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: item.title,
            images: [item.poster.url],
            metadata: {
              _id: item._id,
            },
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      shipping_address_collection: { allowed_countries: ["BE", "NL"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "eur" },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 1500, currency: "eur" },
            display_name: "Next day air",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 1 },
              maximum: { unit: "business_day", value: 1 },
            },
          },
        },
      ],
      customer: customer.id,
      line_items,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/payment-success/`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
    });

    res.status(200).json({
      success: true,
      url: session.url,
    });
  }
);

export const stripeWebhook = catchAsyncErrors(async (req, res, next) => {
  const sig = req.headers["stripe-signature"];

  const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

  if (event.type === "checkout.session.completed") {
    const customer = await stripe.customers.retrieve(
      event.data.object.customer
    );

    createOrder(customer, event.data.object);
  }
  // Return a 200 response to acknowledge receipt of the event
  res.status(200).end();
});

const createOrder = catchAsyncErrors(async (customer, data) => {
  const items = JSON.parse(customer.metadata.cartItems);

  await Order.create({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products: items,
    subTotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status,
  });
});
