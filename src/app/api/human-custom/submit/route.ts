// src/app/api/human-custom/submit/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { human_custom_orders } from "@/db/schema/humanCustom";
import { getServerUserIdFallback } from "@/lib/auth";
import fetch from "node-fetch";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.nickname) return NextResponse.json({ error: "nickname required" }, { status: 400 });

    // get user id from cookie/session (fallback)
    const uid = await getServerUserIdFallback();
    const userId = uid ?? "anonymous";

    // insert into DB
    await db.insert(human_custom_orders).values({
      user_id: String(userId),
      email: body.email ?? null,
      nickname: body.nickname,
      language: body.language ?? "zh",
      topic: body.topic ?? null,
      style: body.style ?? null,
      duration: body.duration ?? null,
      contact_methods: body.contact_methods ?? null,
      allow_off_platform_contact: Boolean(body.allow_off_platform_contact ?? false),
      details: body.details ?? null,
    });

    // notify admin via Resend
    try {
      const adminEmail = process.env.ADMIN_EMAIL!;
      const resendApiKey = process.env.RESEND_API_KEY!;
      const payload = {
        from: "no-reply@yourdomain.com",
        to: [adminEmail],
        subject: `新定制陪聊申请：${body.nickname}`,
        html: `<p>New order from <strong>${body.nickname}</strong> (${body.email ?? "no-email"})</p><pre>${JSON.stringify(body, null, 2)}</pre>`,
      };

      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (!r.ok) {
        console.error("Resend failed:", await r.text());
      }
    } catch (mailErr) {
      console.error("Failed to notify admin:", mailErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Submit human-custom error:", err);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
