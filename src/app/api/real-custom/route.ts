// src/app/api/real-custom/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_KEY!; // ANON 或 SERVICE role 视情况而定

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { style, language, frequency, special, contact } = body;

    // 简单过滤：禁止出现明显违法词（可扩展）
    const forbidden = ["违法", "贩毒", "爆炸", "杀人", "未成年"];
    for (const f of forbidden) {
      if ((special || "").includes(f)) {
        return NextResponse.json({ message: "包含不允许的内容" }, { status: 400 });
      }
    }

    const { data, error } = await supabase.from("real_custom_request").insert([{
      style, language, frequency, special, contact, status: "pending"
    }]);

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true, id: data?.[0]?.id ?? null });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || "Server error" }, { status: 500 });
  }
}
