"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { dbConfig } from "@/utils/pouchdb";
// import { useRouter } from "next/navigation";
import { usePouchDB } from "@/hooks/use-pouchdb";
import { useAuth } from "@/hooks/use-auth";
import { Note } from "@/models/Note";

export interface INotesContext {
  notes: Note[];
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
    const result = await pouchDB.findAllData<Note>("notes", {
      selector: {
        userId: auth.getUserData()?.userId,
        createdAt: { $exists: true },
      },
      // sort: [{ createdAt: "asc" }],
      use_index: [
        dbConfig.notes.index.notesList.ddoc,
        dbConfig.notes.index.notesList.name,
      ],
    });
    console.log("getAllNotes result: ", result);
    setNotes(result);
  }, [pouchDB, auth]);

  useEffect(() => {
    getAllNotes();
  }, [getAllNotes]);

  const createNewNote = useCallback(async () => {
    try {
      const userData = auth.getUserData();
      console.log("creating new note for", auth.getUserData());
      const noteId = `note-${uuidv4()}`;
      const newNote = new Note({
        _id: noteId,
        noteId,
        icon: "😀",
        title: "Untitled Note",
        content: "",
        footNote: "",
        userId: userData?.userId || "",
      });

      console.log("onCreateNewNote click: ", newNote);

      // add new note to the PouchDB
      const result = await pouchDB.addData<Note, Note>("notes", newNote);
      console.log("result createNewNote()", result);
      setNotes((prev) => [...prev, result]);
    } catch (error) {
      console.error("Error createNewNote(): ", error);
    }
  }, [pouchDB, auth]);

  const contextValue = useMemo(
    () => ({ notes, getAllNotes, createNewNote }),
    [notes, getAllNotes, createNewNote]
  );

  return (
    <NotesContext.Provider value={contextValue}>
      {children}
    </NotesContext.Provider>
  );
};
