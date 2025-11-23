// src/app/real-custom/page.tsx
"use client";
import { useState } from "react";

export default function RealCustomPage() {
  const [form, setForm] = useState({
    style: "",
    language: "中文",
    frequency: "",
    special: "",
    contact: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch("/api/real-custom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const j = await res.json();
      if (res.ok) {
        setMsg("提交成功，我们会尽快为你匹配陪聊师。");
        setForm({ style: "", language: "中文", frequency: "", special: "", contact: "" });
      } else {
        setMsg("提交失败：" + (j.message || "未知错误"));
      }
    } catch (err) {
      setMsg("网络错误，请稍后再试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-3">定制陪聊</h1>
      <p className="text-gray-600 mb-4">填写你的需求（任何合法要求都可以），我们会为你匹配最合适的陪聊师。</p>

      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <div>
          <label className="block text-sm font-medium">聊天风格</label>
          <input required value={form.style} onChange={(e)=>setForm({...form, style:e.target.value})} className="w-full border p-2 rounded" placeholder="例如：温柔/搞笑/鼓励型"/>
        </div>

        <div>
          <label className="block text-sm font-medium">使用语言</label>
          <select value={form.language} onChange={(e)=>setForm({...form, language:e.target.value})} className="w-full border p-2 rounded">
            <option>中文</option>
            <option>英文</option>
            <option>中英双语</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">聊天频率</label>
          <input value={form.frequency} onChange={(e)=>setForm({...form, frequency:e.target.value})} className="w-full border p-2 rounded" placeholder="例如：每周3次，每次30分钟"/>
        </div>

        <div>
          <label className="block text-sm font-medium">特殊需求（不能违法）</label>
          <textarea value={form.special} onChange={(e)=>setForm({...form, special:e.target.value})} className="w-full border p-2 rounded" placeholder="例如：希望是英语母语者/偏学术辅导等"></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium">联系方式（微信/WhatsApp/Email，选填）</label>
          <input value={form.contact} onChange={(e)=>setForm({...form, contact:e.target.value})} className="w-full border p-2 rounded" placeholder="方便我们联系你"/>
        </div>

        <div>
          <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
            {loading ? "提交中..." : "提交需求"}
          </button>
        </div>

        {msg && <div className="text-sm text-gray-700 mt-2">{msg}</div>}
      </form>
    </div>
  );
}
