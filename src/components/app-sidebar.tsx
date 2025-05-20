"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useNotes } from "@/hooks/use-notes";

export function AppSidebar() {
  const { notes } = useNotes();

  const onCreateNewNote = () => {
    notes.createNewNote();
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <h1>Next Offline Notes PWA</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>My Notes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key="menu-item-1">
                <SidebarMenuButton>
                  <p>My Note #1</p>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton>
                  <p>My sub Note #1.1</p>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Default Action Group */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  key="sidebar-menu-create-note-cta"
                  onClick={onCreateNewNote}
                >
                  <p>Create New Note</p>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <p>Adhitama Fikri, 2025</p>
      </SidebarFooter>
    </Sidebar>
  );
}
