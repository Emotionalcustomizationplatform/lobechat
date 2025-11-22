// src/app/membership/page.tsx
"use client";
import React from "react";

export default function MembershipPage() {
  const onSubscribe = async () => {
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId: "TODO_USER_ID" }) });
      const j = await res.json();
      if (j.url) window.location.href = j.url;
      else alert("创建结账失败");
    } catch (err) {
      console.error(err);
      alert("请求失败");
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 20 }}>
      <h1>成为会员 — $99/月</h1>
      <p>会员可提交定制陪聊申请并解锁高级 AI 聊天。</p>
      <button onClick={onSubscribe}>订阅会员 $99 / 月</button>
    </div>
  );
}
