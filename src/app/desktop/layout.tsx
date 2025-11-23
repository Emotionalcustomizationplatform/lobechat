// src/app/layout.tsx
import "./globals.css";
import BottomTab from "@/components/BottomTab";

export const metadata = {
  title: "LobeChat - 定制陪聊平台",
  description: "AI + 真人陪聊，专为留学生和美国用户设计",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col bg-gray-50">
        {/* 主内容放这里 */}
        <main className="flex-1 container mx-auto px-4 py-6">
          {children}
        </main>

        {/* 底部 Tab（固定在底部） */}
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t">
          <div className="container mx-auto px-4">
            <BottomTab />
          </div>
        </footer>
      </body>
    </html>
  );
}
