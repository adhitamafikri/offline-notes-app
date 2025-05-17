"use client";

import { useRef } from "react";
import { IAppPouchDB } from "@/models/PouchDB";

export function usePouchDB() {
  const pouchDBRef = useRef<IAppPouchDB>(null);

  const loadPouchDB = async () => {
    if (!pouchDBRef.current) {
      const { AppPouchDB } = await import("@/lib/pouch-db");
      pouchDBRef.current = AppPouchDB;
    }
    return pouchDBRef.current as IAppPouchDB;
  };

  const getDBInfo = async () => {
    const db = await loadPouchDB();
    db.getDBInfo();
  };

  return {
    getDBInfo,
  };
}
