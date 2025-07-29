import DashboardForm from "../_components/DashboardForm";
import { getUserByToken } from "../_lib/session";

export default async function page() {
  const user = await getUserByToken();

  return <DashboardForm user={user!.userId}></DashboardForm>;
}
