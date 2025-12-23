import { SidebarProvider } from "@/components/atoms/Sidebar";
import SidebarHeader from "@/components/molecules/(nav)/SidebarHeader";
import { AdminSidebar } from "@/components/organisms/(admin)/Sidebar";
import { getCookie } from "@/lib/cookies/get";
import { decrypt } from "@/lib/token";
import { getUser } from "@/services/auth.service";
import { redirect } from "next/navigation";
import type React from "react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookie = await getCookie("token");
  if (!cookie) redirect("/");
  const { payload } = await decrypt({ token: cookie.value, type: "REFRESH" });
  const user = await getUser({ id: payload.id });
  if (!user) redirect("/");
  const { email } = user;

  return (
    <SidebarProvider>
      <div className="bg-background flex min-h-screen w-screen pt-16">
        <AdminSidebar email={email} />
        <main className="flex-1">
          <div className="container mx-auto p-4">
            <SidebarHeader />
            <div className="pt-4">{children}</div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
