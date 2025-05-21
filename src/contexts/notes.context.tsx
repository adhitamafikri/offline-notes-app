"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { nanoid } from "nanoid";
import { dbConfig } from "@/utils/pouchdb";
// import { useRouter } from "next/navigation";
import { usePouchDB } from "@/hooks/use-pouchdb";
import { useAuth } from "@/hooks/use-auth";
import { Note } from "@/models/Note";

export interface INotesContext {
  notes: Note[];
  getAllNotes: () => Promise<void>;
  getNoteById: (noteId: string) => Promise<Note | null>;
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
    const userData = auth.getUserData();
    if (!userData) {
      throw new Error("User is not logged in");
    }

    const result = await pouchDB.findAllData<Note>("notes", {
      selector: {
        userId: userData.userId,
        createdAt: { $exists: true },
      },
      sort: ["userId", "createdAt"],
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

  const getNoteById = useCallback(
    async (noteId: string): Promise<Note | null> => {
      const userData = auth.getUserData();
      if (!userData) {
        throw new Error("User is not logged in");
      }

      const result = await pouchDB.findData<Note>("notes", {
        selector: {
          userId: userData.userId,
          noteId,
        },
        use_index: [
          dbConfig.notes.index.noteById.ddoc,
          dbConfig.notes.index.noteById.name,
        ],
      });

      return result;
    },
    [auth]
  );

  const createNewNote = useCallback(async () => {
    try {
      const userData = auth.getUserData();
      console.log("creating new note for", auth.getUserData());
      const noteId = `note-${nanoid()}`;
      const newNote = new Note({
        _id: noteId,
        noteId,
        icon: "😀",
        title: "Untitled Note",
        content: "",
        footNote: "",
        userId: userData?.userId || "",
      });

      // add new note to the PouchDB
      const result = await pouchDB.addData<Note, Note>("notes", newNote);
      setNotes((prev) => [...prev, result]);
    } catch (error) {
      console.error("Error createNewNote(): ", error);
    }
  }, [pouchDB, auth]);

  const contextValue = useMemo(
    () => ({ notes, getAllNotes, getNoteById, createNewNote }),
    [notes, getAllNotes, getNoteById, createNewNote]
  );

  return (
    <NotesContext.Provider value={contextValue}>
      {children}
    </NotesContext.Provider>
  );
};
