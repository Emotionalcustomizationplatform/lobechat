// src/app/chat/page.tsx
"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

/**
 * 我优先尝试加载现有 Chat 组件（如果你项目已有）
 * 常见位置：
 *  - src/components/Chat
 *  - src/app/chat/ChatClient
 * 如果没有，会显示 fallback 占位，方便你按需替换。
 */

const ChatComponent = dynamic(
  async () => {
    try {
      // 先尝试常见位置 1
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const mod = await import("@/components/Chat");
      return mod.default ?? (() => <div>原始 Chat 组件加载失败</div>);
    } catch (err) {
      try {
        // 位置 2
        // @ts-ignore
        const mod2 = await import("@/app/chat/ChatClient");
        return mod2.default ?? (() => <div>原始 Chat 组件加载失败</div>);
      } catch (e) {
        // 返回空组件
        return () => <div className="p-6 text-gray-600">未检测到现成的 Chat 组件。你可以把原始聊天组件放在 <code>src/components/Chat</code> 或 <code>src/app/chat/ChatClient</code>，我会自动加载。</div>;
      }
    }
  },
  { ssr: false }
);

export default function ChatPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">会话</h1>
      <Suspense fallback={<div>加载会话...</div>}>
        <ChatComponent />
      </Suspense>
    </div>
  );
}
