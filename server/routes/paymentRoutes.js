import express from "express";
import {
  createCheckoutSession,
  stripeWebhook,
} from "../controllers/paymentController.js";

const router = express.Router();

router.route("/create-checkout-session").post(createCheckoutSession);

export default router;
