import DashboardForm from "../../components/DashboardForm";
import { getUserByToken } from "../../lib/session";

export default async function page() {
  const user = await getUserByToken();

  return <DashboardForm user={user!.userId}></DashboardForm>;
}
