// src/lib/auth.ts
import { cookies } from "next/headers";
import { db } from "./db";
import { users } from "@/db/schema/users"; // adjust path if necessary

export async function getServerUserIdFallback() {
  // NOTE: This is a simple fallback that reads cookie "user-id".
  // Replace with NextAuth getServerSession in production.
  try {
    const cookieStore = cookies();
    const uid = cookieStore.get("user-id")?.value;
    if (!uid) return null;
    // If you have users table and drizzle, you can optionally validate existence:
    // const rows = await db.select().from(users).where(users.id.eq(parseInt(uid))).limit(1);
    // return rows[0] ?? null;
    return uid;
  } catch (err) {
    return null;
  }
}
