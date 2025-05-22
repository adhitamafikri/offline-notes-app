"use client";

import dynamic from "next/dynamic";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { PouchDBProvider } from "@/contexts/pouchdb.context";
import { NetworkStatusProvider } from "@/contexts/network-status.context";
import { AuthProvider } from "@/contexts/auth.context";
import { NotesProvider } from "@/contexts/notes.context";

const NetworkStatusAlert = dynamic(
  () =>
    import("@/components/network-status-alert").then(
      (mod) => mod.NetworkStatusAlert
    ),
  { ssr: false }
);

export default function LayoutSection({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div id="private-layout">
      <PouchDBProvider>
        <NetworkStatusProvider>
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

          <NetworkStatusAlert />
        </NetworkStatusProvider>
      </PouchDBProvider>

      <Toaster />
    </div>
  );
}
