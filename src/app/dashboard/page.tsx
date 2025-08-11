import { decrypt, getSession } from "@/lib/session";
import DashboardForm from "../../components/DashboardForm";
import { redirect } from "next/navigation";

export default async function page() {
  try {
    const token = await getSession();
    const payload = await decrypt(token);
    return <DashboardForm user={payload.userId}></DashboardForm>;
  } catch {
    redirect("/");
  }
}
