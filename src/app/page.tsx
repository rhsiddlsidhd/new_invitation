import HomeForm from "../components/HomeForm";
import { decrypt, getSession } from "../lib/session";

export default async function Home() {
  let user = null;

  try {
    const token = await getSession();
    const payload = await decrypt(token);
    user = payload.userId;

    // user = await getUserByToken();
  } catch {
    user = null;
  }

  return <HomeForm user={user} />;
}
