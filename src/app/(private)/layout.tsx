import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { PouchDBProvider } from "@/contexts/pouchdb.context";
import { AuthProvider } from "@/contexts/auth.context";
import { NotesProvider } from "@/contexts/notes.context";

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
      <PouchDBProvider>
        <AuthProvider>
          <NotesProvider>
            <SidebarProvider>
              <div className="page-sidebar">
                <AppSidebar />
              </div>
              <div className="page-content w-full">
                <SidebarTrigger />
                {children}
              </div>
            </SidebarProvider>
          </NotesProvider>
        </AuthProvider>
      </PouchDBProvider>
    </div>
  );
}
