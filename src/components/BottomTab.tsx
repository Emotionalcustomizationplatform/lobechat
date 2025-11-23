// src/components/BottomTab.tsx
"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const tabs = [
  { key: "chat", label: "会话", href: "/chat", icon: "💬" },
  { key: "custom", label: "定制陪聊", href: "/real-custom", icon: "🤝" },
  { key: "ai", label: "AI角色", href: "/ai-roles", icon: "🤖" },
  { key: "companions", label: "陪聊师", href: "/real-chat", icon: "👩‍🦰" },
  { key: "me", label: "我的", href: "/me", icon: "👤" },
];

export default function BottomTab() {
  const pathname = usePathname() || "/";
  return (
    <nav className="flex justify-between items-center py-2 px-1">
      {tabs.map((t) => {
        const active = pathname.startsWith(t.href);
        return (
          <Link key={t.key} href={t.href} className="flex-1">
            <div className={`flex flex-col items-center justify-center py-2 ${active ? "text-blue-600" : "text-gray-600"}`}>
              <div className="text-2xl">{t.icon}</div>
              <div className="text-sm mt-1">{t.label}</div>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
