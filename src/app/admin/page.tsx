import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/utils/auth";
import AdminPanel from "@/components/admin/AdminPanel";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const user = verifyToken(token);

  if (!user || typeof user !== "object" || user.role !== "admin") {
    redirect("/");
  }

  return <AdminPanel />;
}
