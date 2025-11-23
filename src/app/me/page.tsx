// src/app/me/page.tsx
"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function MePage() {
  const params = useSearchParams();
  const book = params?.get("book");
  const profile = params?.get("profile");

  useEffect(() => {
    if (book) {
      // 这里可以弹出预约 modal 或跳转到付款/聊天流程
      console.log("用户想联系陪聊师：", book);
    }
    if (profile) {
      console.log("查看陪聊师资料：", profile);
    }
  }, [book, profile]);

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-3">我的 • 会员中心</h1>

      <div className="grid grid-cols-1 gap-4 max-w-xl">
        <div className="bg-white p-4 border rounded">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-500">当前会员</div>
              <div className="text-lg font-semibold">未开通</div>
            </div>
            <div>
              <a href="/api/create-checkout-session" className="px-4 py-2 bg-purple-600 text-white rounded">开通 $99 / 月</a>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">会员可优先匹配陪聊师、AI 角色无限制使用、折扣等。</p>
        </div>

        <div className="bg-white p-4 border rounded">
          <div className="text-sm text-gray-500">我的预约 / 服务记录</div>
          <div className="text-sm text-gray-700 mt-2">暂无记录（示例）</div>
        </div>

        <div className="bg-white p-4 border rounded">
          <div className="text-sm text-gray-500">收藏的陪聊师</div>
          <div className="text-sm text-gray-700 mt-2">暂无收藏（示例）</div>
        </div>
      </div>
    </div>
  );
}
