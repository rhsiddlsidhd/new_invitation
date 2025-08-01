import HomeForm from "../components/HomeForm";
import { getUserByToken } from "../lib/session";

export default async function Home() {
  let user = null;

  try {
    user = await getUserByToken();
  } catch {
    user = null;
  }

  return <HomeForm user={user ? user.userId : null} />;
}
