// src/app/api/stripe/webhook/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { users } from "@/db/schema/users"; // adjust if your users schema is elsewhere
import { subscriptions } from "@/db/schema/subscriptions"; // if you have subscriptions schema

export const config = { runtime: "nodejs" };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2022-11-15" });

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "missing signature" }, { status: 400 });
  const buf = await req.arrayBuffer();
  const raw = Buffer.from(buf).toString("utf8");

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId ?? null;
      // TODO: use userId or customer email to find and update your user record
      if (userId) {
        await db.update(users).set({ is_active_member: true, stripe_customer_id: String(session.customer) }).where(users.id.eq(Number(userId)));
      }
      // optionally save subscription info in subscriptions table
    }

    if (event.type === "customer.subscription.deleted" || event.type === "customer.subscription.updated") {
      const subscription = event.data.object as Stripe.Subscription;
      // TODO: find user by subscription.customer or metadata and update subscription status accordingly
    }
  } catch (err) {
    console.error("Error handling stripe event:", err);
  }

  return NextResponse.json({ received: true });
}
