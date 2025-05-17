"use client";

// import { AppPouchDB } from "@/lib/pouch-db";

export function usePouchDB() {
  const getDBInfo = async () => {
    const { AppPouchDB } = await import("@/lib/pouch-db");
    await AppPouchDB.getDBnfo();
  };

  return {
    getDBInfo,
  };
}
