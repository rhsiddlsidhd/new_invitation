import HomeForm from "./_components/HomeForm";
import { getUserByToken } from "./_lib/session";

export default async function Home() {
  const user = await getUserByToken();
  console.log("user:", user);
  return <HomeForm user={user ? user.userId : null} />;
}
