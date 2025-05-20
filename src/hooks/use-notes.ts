"use client";

import { useContext } from "react";
import { NotesContext, type INotesContext } from "@/contexts/notes.context";

export function useNotes(): { notes: INotesContext } {
  const notes = useContext<INotesContext | undefined>(NotesContext);
  if (notes === undefined) {
    throw new Error(
      "NotesContext should be used inside the <NotesProvider />"
    );
  }

  return {
    notes,
  };
}
