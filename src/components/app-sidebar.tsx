"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
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
  // SidebarMenuSub,
  // SidebarMenuSubButton,
  // SidebarMenuSubItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useNotes } from "@/hooks/use-notes";
import { Note } from "@/models/Note";

export function AppSidebar() {
  const router = useRouter();
  const { notes } = useNotes();

  const myNotes = useMemo(() => notes.notes, [notes.notes]);

  useEffect(() => {
    console.log("this is my notes from sidebar", myNotes);
  }, [myNotes]);

  const onCreateNewNote = () => {
    notes.createNewNote();
  };

  const onNoteClick = (note: Note) => {
    console.log("You're gonna see the note: ", note);
    router.push(`/notes/${note._id}`);
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
              {/* Render Actual Note List */}
              {notes.notes.map((note) => (
                <SidebarMenuItem key={`note-${note._id}`}>
                  <SidebarMenuButton onClick={() => onNoteClick(note)}>
                    <p>{note.title}</p>
                    <p>{note.icon}</p>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
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
