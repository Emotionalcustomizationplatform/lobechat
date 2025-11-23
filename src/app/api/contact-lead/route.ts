// src/app/api/contact-lead/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { contact, note } = body;
    if (!contact) return NextResponse.json({ message: "联系方式不能为空" }, { status: 400 });

    const { data, error } = await supabase.from("contact_leads").insert([{ contact_info: contact, notes: note }]);
    if (error) return NextResponse.json({ message: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || "Server error" }, { status: 500 });
  }
}
