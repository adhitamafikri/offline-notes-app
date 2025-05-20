"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
// import { useRouter } from "next/navigation";
import { usePouchDB } from "@/hooks/use-pouchdb";
import { useAuth } from "@/hooks/use-auth";
import { Note } from "@/models/Note";

export interface INotesContext {
  getAllNotes: () => Promise<void>;
  createNewNote: () => void;
}

export const NotesContext = createContext<INotesContext | undefined>(undefined);

export const NotesProvider = ({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) => {
  const { auth } = useAuth();
  const { pouchDB } = usePouchDB();

  const [notes, setNotes] = useState<Note[]>([]);

  const getAllNotes = useCallback(async (): Promise<void> => {
    const result = await pouchDB.findAllData<Note>({
      selector: { docType: "note" },
    });
    console.log("getAllNotes result: ", result);
    setNotes(result);
  }, [pouchDB]);

  useEffect(() => {
    getAllNotes();
  }, [getAllNotes]);

  useEffect(() => {
    console.log("Our notes", notes);
  }, [notes]);

  const createNewNote = useCallback(async () => {
    try {
      const userData = auth.getUserData();
      console.log("creating new note for", auth.getUserData());
      const noteId = `note-${uuidv4()}`;
      const newNote = new Note({
        _id: noteId,
        noteId,
        title: "Untitled Note",
        content: "",
        footNote: "",
        userId: userData?.userId || "",
      });

      console.log("onCreateNewNote click: ", newNote);

      // add new note to the PouchDB
      const result = await pouchDB.addData<Note, Note>(newNote, "note");
      console.log("result createNewNote()", result);
    } catch (error) {
      console.error("Error createNewNote(): ", error);
    }
  }, [pouchDB, auth]);

  const contextValue = useMemo(
    () => ({ getAllNotes, createNewNote }),
    [getAllNotes, createNewNote]
  );

  return (
    <NotesContext.Provider value={contextValue}>
      {children}
    </NotesContext.Provider>
  );
};
