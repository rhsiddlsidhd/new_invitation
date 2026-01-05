import { SidebarProvider } from "@/components/atoms/Sidebar";
import SidebarNavItem from "@/components/molecules/(nav)/SidebarNavItem";
import SidebarLayout from "@/components/molecules/SidebarLayout";
import AdminModal from "@/components/organisms/(admin)/AdminModal";
import SidebarToggle from "@/components/organisms/(sidebar)/SidebarToggle";
import { getCookie } from "@/lib/cookies/get";
import { decrypt } from "@/lib/token";
import { getUser } from "@/services/auth.service";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const cookie = await getCookie("token");
  if (!cookie) redirect("/");
  const { payload } = await decrypt({ token: cookie.value, type: "REFRESH" });
  const user = await getUser({ id: payload.id });
  if (!user) redirect("/");
  const { email, role } = user;
  return (
    <SidebarProvider>
      {/*  */}
      <div className="bg-background flex min-h-screen w-screen pt-16">
        <SidebarLayout email={email} role={role}>
          <SidebarNavItem type="MY_ORDER" />
        </SidebarLayout>
        <main className="flex-1">
          <div className="container mx-auto p-4">
            <SidebarToggle />
            <div className="pt-4">{children}</div>
          </div>
          {/* <AdminModal /> */}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default layout;
