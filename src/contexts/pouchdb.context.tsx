"use client";

import React, {
  useRef,
  createContext,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { dbConfig } from "@/utils/pouchdb";

export type DocType = "users" | "notes" | "userSettings";

export interface IPouchDBContext {
  getInfo: () => Promise<void>;
  findData: <T>(
    docType: DocType,
    findOptions: {
      selector: Record<string, unknown>;
      fields?: string[];
      sort?: string[];
      use_index?: string | [string, string];
    }
  ) => Promise<T | null>;
  findAllData: <T>(
    docType: DocType,
    findOptions: {
      selector: Record<string, unknown>;
      fields?: string[];
      sort?: string[];
      use_index?: string | [string, string];
    }
  ) => Promise<T[]>;
  addData: <T, R>(
    docType: DocType,
    data: PouchDB.Core.PutDocument<{} & T>
  ) => Promise<R>;
}

export const PouchDBContext = createContext<IPouchDBContext | undefined>(
  undefined
);

export const PouchDBProvider = ({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) => {
  const usersDBRef = useRef<PouchDB.Database | null>(null);
  const notesDBRef = useRef<PouchDB.Database | null>(null);
  const userSettingsDBRef = useRef<PouchDB.Database | null>(null);

  const loadPouchDB = async () => {
    if (
      !usersDBRef.current ||
      !notesDBRef.current ||
      !userSettingsDBRef.current
    ) {
      const PouchDB = (await import("pouchdb")).default;
      PouchDB.plugin((await import("pouchdb-find")).default);

      const usersDB = new PouchDB(dbConfig.users.name);
      const notesDB = new PouchDB(dbConfig.notes.name);
      const userSettingsDB = new PouchDB(dbConfig.userSettings.name);
      await usersDB.createIndex({
        index: dbConfig.users.index.findUser,
      });
      await notesDB.createIndex({
        index: dbConfig.notes.index.notesList,
      });
      await notesDB.createIndex({
        index: dbConfig.notes.index.notesByTitle,
      });
      await userSettingsDB.createIndex({
        index: dbConfig.userSettings.index.findUserSettings,
      });

      usersDBRef.current = usersDB;
      notesDBRef.current = notesDB;
      userSettingsDBRef.current = userSettingsDB;
    }

    return {
      users: usersDBRef.current as PouchDB.Database,
      notes: notesDBRef.current as PouchDB.Database,
      userSettings: userSettingsDBRef.current as PouchDB.Database,
    };
  };

  // create a db in the indexedDB
  useEffect(() => {
    loadPouchDB();
  }, []);

  const getInfo = useCallback(async () => {
    const db = await loadPouchDB();
    const usersDBInfo = await db.users.info();
    const notesDBInfo = await db.notes.info();
    const userSettingsDBInfo = await db.userSettings.info();
    console.log("Here's the DB info: ");
    console.table({
      usersDB: usersDBInfo,
      notesDB: notesDBInfo,
      userSettingsDB: userSettingsDBInfo,
    });
  }, []);

  const findData = useCallback(
    async <T,>(
      docType: DocType,
      findOptions: {
        selector: Record<string, unknown>;
        fields?: string[];
        sort?: string[];
        use_index?: string | [string, string];
      }
    ): Promise<T | null> => {
      try {
        const db = await loadPouchDB();
        const result = await db[docType].find(findOptions);
        console.log("result", result);
        return result.docs[0] as T | null;
      } catch (error) {
        console.error("Error finding data from PouchDB: ", error);
        throw error;
      }
    },
    []
  );

  const findAllData = useCallback(
    async <T,>(
      docType: DocType,
      findOptions: {
        selector: Record<string, unknown>;
        fields?: string[];
        sort?: string[];
        use_index?: string | [string, string];
      }
    ): Promise<T[]> => {
      try {
        const db = await loadPouchDB();
        const result = await db[docType].find(findOptions);
        console.log("result", result);
        return result.docs as T[];
      } catch (error) {
        console.error("Error finding data from PouchDB: ", error);
        throw error;
      }
    },
    []
  );

  const addData = useCallback(
    async <T, R>(
      docType: DocType,
      data: PouchDB.Core.PutDocument<{} & T>
    ): Promise<R> => {
      try {
        const db = await loadPouchDB();
        const putResult = await db[docType].put<T>({ ...data, docType });
        const getResult = await db[docType].get(putResult.id);
        return getResult as R;
      } catch (error) {
        console.error("Error adding data into PouchDB: ", error);
        throw error;
      }
    },
    []
  );

  const contextValue = useMemo(
    () => ({ getInfo, findData, findAllData, addData }),
    [getInfo, findData, findAllData, addData]
  );

  return (
    <PouchDBContext.Provider value={contextValue}>
      {children}
    </PouchDBContext.Provider>
  );
};
