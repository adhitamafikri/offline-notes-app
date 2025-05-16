import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
} from "@/components/ui/sidebar";

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  if (cookieStore.get("access_token") === undefined) {
    return redirect("/auth/login");
  }

  return (
    <div id="private-layout">
      <SidebarProvider>
        <div className="page-sidebar">
          <Sidebar />
        </div>
        <div className="page-content w-full">
          <SidebarTrigger />
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
}
