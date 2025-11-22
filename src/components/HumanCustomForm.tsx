// src/components/HumanCustomForm.tsx
"use client";
import React, { useState } from "react";

type FormState = {
  nickname: string;
  email: string;
  language: string;
  topic: string;
  style: string;
  duration: string;
  contact_methods: string;
  allow_off_platform_contact: boolean;
  details: string;
};

export default function HumanCustomForm({ initial = {} }: { initial?: Partial<FormState> }) {
  const [form, setForm] = useState<FormState>({
    nickname: initial.nickname ?? "",
    email: initial.email ?? "",
    language: initial.language ?? "zh",
    topic: initial.topic ?? "",
    style: initial.style ?? "",
    duration: initial.duration ?? "one-off",
    contact_methods: initial.contact_methods ?? "",
    allow_off_platform_contact: initial.allow_off_platform_contact ?? false,
    details: initial.details ?? "",
  });
  const [loading, setLoading] = useState(false);

  const handle = (k: keyof FormState, v: any) => setForm((s) => ({ ...s, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/human-custom/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const j = await res.json();
      if (j.ok) {
        alert("提交成功！管理员已收到通知。");
        setForm({
          nickname: "",
          email: "",
          language: "zh",
          topic: "",
          style: "",
          duration: "one-off",
          contact_methods: "",
          allow_off_platform_contact: false,
          details: "",
        });
      } else {
        alert("提交失败：" + (j.error ?? "未知"));
      }
    } catch (err) {
      console.error(err);
      alert("请求失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <h2>定制陪聊需求表</h2>
      <p style={{ color: "#666" }}>
        说明：请不要提交违法或强迫性质的要求。陪聊师有权拒绝任何不适当要求。
      </p>

      <label>昵称（显示给陪聊师）</label>
      <input value={form.nickname} onChange={(e) => handle("nickname", e.target.value)} required />

      <label>联系邮箱（可选，用于通知）</label>
      <input type="email" value={form.email} onChange={(e) => handle("email", e.target.value)} />

      <label>语言偏好</label>
      <select value={form.language} onChange={(e) => handle("language", e.target.value)}>
        <option value="zh">中文</option>
        <option value="en">English</option>
      </select>

      <label>聊天主题（简述）</label>
      <input value={form.topic} onChange={(e) => handle("topic", e.target.value)} placeholder="例如：学习压力，情感倾诉..." />

      <label>陪聊风格（可多写）</label>
      <input value={form.style} onChange={(e) => handle("style", e.target.value)} placeholder="例如：温柔、理性、幽默..." />

      <label>时长 / 类型</label>
      <select value={form.duration} onChange={(e) => handle("duration", e.target.value)}>
        <option value="one-off">一次性</option>
        <option value="short-term">短期（1-4次）</option>
        <option value="long-term">长期</option>
      </select>

      <label>可接受的联系方式（逗号分隔）</label>
      <input value={form.contact_methods} onChange={(e) => handle("contact_methods", e.target.value)} placeholder="例如：平台内,Email,微信,WhatsApp" />

      <label>
        <input type="checkbox" checked={form.allow_off_platform_contact} onChange={(e) => handle("allow_off_platform_contact", e.target.checked)} />
        我同意在平台外与陪聊师交换联系方式（陪聊师同意方可）
      </label>

      <label>详细要求（禁止违法或强迫行为）</label>
      <textarea value={form.details} onChange={(e) => handle("details", e.target.value)} rows={8} />

      <div style={{ marginTop: 12 }}>
        <button type="submit" disabled={loading}>
          {loading ? "提交中..." : "提交定制需求"}
        </button>
      </div>
    </form>
  );
}
