// src/app/human-custom/page.tsx
import HumanCustomForm from "@/components/HumanCustomForm";

export const metadata = { title: "定制陪聊申请 - EmotionCustom" };

export default function Page() {
  return (
    <main>
      <h1 style={{ textAlign: "center", marginTop: 24 }}>提交你的定制陪聊需求</h1>
      <HumanCustomForm />
    </main>
  );
}
