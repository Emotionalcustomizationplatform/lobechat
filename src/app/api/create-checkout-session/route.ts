// src/app/api/create-checkout-session/route.ts
import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2022-11-15" });

export async function GET() {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        { price_data: {
            currency: "usd",
            product_data: { name: "LobeChat 会员 (每月)" },
            unit_amount: 9900,
            recurring: { interval: "month" }
          },
          quantity: 1
        }
      ],
      // 成功 / 取消回跳，可以改为你的网站页面
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://your-domain.com"}/me?checkout=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://your-domain.com"}/me?checkout=cancel`,
    });
    return NextResponse.redirect(session.url!);
  } catch (err: any) {
    return NextResponse.json({ message: err.message || "Stripe error" }, { status: 500 });
  }
}