// src/app/real-chat/page.tsx
"use client";
import { useEffect, useState } from "react";

type Companion = {
  id: string;
  name: string;
  avatar_url?: string;
  tags?: string[];
  intro?: string;
  price?: string;
};

export default function RealChatPage() {
  const [list, setList] = useState<Companion[]>([]);

  useEffect(() => {
    // 临时示例数据 —— 你后续可改为从 /api/companions 或 supabase 加载
    setList([
      { id: "1", name: "Lily", avatar_url: "/images/sample1.jpg", tags: ["温柔","英语母语"], intro: "Hello, I'm Lily. 喜欢陪你聊生活、留学话题", price: "$20/次" },
      { id: "2", name: "Mia", avatar_url: "/images/sample2.jpg", tags: ["活泼","安慰型"], intro: "Hi, I'm Mia. 我会用温柔的语气陪你", price: "$18/次" },
      { id: "3", name: "Anna", avatar_url: "/images/sample3.jpg", tags: ["学术辅导","双语"], intro: "Anna，擅长 essay & 面试辅导", price: "$25/次" },
    ]);
  }, []);

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-3">陪聊师入驻</h1>
      <p className="text-gray-600 mb-4">挑选你喜欢的陪聊师，查看他们的个人信息与标签，按需联系。</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {list.map((c) => (
          <div key={c.id} className="bg-white border rounded p-3 flex gap-3 items-center">
            <img src={c.avatar_url} alt={c.name} className="w-20 h-20 rounded object-cover" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-sm text-gray-500">{c.tags?.join(" · ")}</div>
                </div>
                <div className="text-sm text-gray-600">{c.price}</div>
              </div>
              <p className="text-sm text-gray-700 mt-2">{c.intro}</p>
              <div className="mt-3 flex gap-2">
                <a href={`/me?book=${c.id}`} className="px-3 py-1 bg-blue-600 text-white rounded text-sm">立即联系</a>
                <a href={`/me?profile=${c.id}`} className="px-3 py-1 border rounded text-sm">查看资料</a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-500 mt-4">注：图片为示例占位，请替换为陪聊师真实头像或抽象插图以保护隐私。</p>
    </div>
  );
}
