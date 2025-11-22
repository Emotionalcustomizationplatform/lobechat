// src/app/admin/orders/page.tsx
import { db } from "@/lib/db";
import { human_custom_orders } from "@/db/schema/humanCustom";

export const metadata = { title: "Admin Orders - EmotionCustom" };

export default async function AdminOrdersPage() {
  // TODO: Enforce admin auth here (NextAuth getServerSession or middleware)
  const orders = await db.select().from(human_custom_orders).orderBy(human_custom_orders.created_at.desc);

  return (
    <main style={{ padding: 20 }}>
      <h1>定制陪聊订单（管理员）</h1>
      <p>注意：此页面应仅管理员可访问。</p>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr><th>ID</th><th>昵称</th><th>邮箱</th><th>语言</th><th>主题</th><th>状态</th><th>时间</th></tr>
        </thead>
        <tbody>
          {orders.map((o: any) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.nickname}</td>
              <td>{o.email}</td>
              <td>{o.language}</td>
              <td style={{ maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis" }}>{o.topic}</td>
              <td>{o.status}</td>
              <td>{new Date(o.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
