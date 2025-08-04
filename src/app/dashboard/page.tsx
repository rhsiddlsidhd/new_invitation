import { decrypt, getSession } from "@/lib/session";
import DashboardForm from "../../components/DashboardForm";

export default async function page() {
  const token = await getSession();
  const payload = await decrypt(token);

  return <DashboardForm user={payload.userId}></DashboardForm>;
}
