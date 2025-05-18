"use client";

import { useContext } from "react";
import {
  PouchDBContext,
  type IPouchDBContext,
} from "@/contexts/pouchdb.context";

export function usePouchDB(): { pouchDB: IPouchDBContext } {
  const pouchDB = useContext<IPouchDBContext | undefined>(PouchDBContext);
  if (pouchDB === undefined) {
    throw new Error(
      "PouchDBContext should be used inside the <PouchDBProvider />"
    );
  }

  return {
    pouchDB,
  };
}
