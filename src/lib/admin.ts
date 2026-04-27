import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const ADMIN_EMAILS = ["asainc26@gmail.com"];

export async function getAdminSession() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) return null;

  const isAdmin = ADMIN_EMAILS.includes(session.user.email);

  if (!isAdmin) return null;

  return session;
}