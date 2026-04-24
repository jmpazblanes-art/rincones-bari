import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
  const jar = await cookies();
  if (jar.get("admin_session")?.value !== "logged_in") {
    redirect("/admin/login");
  }
  return <AdminDashboard />;
}
