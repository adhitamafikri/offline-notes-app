/**
 * @description - A client only lib
 */
import PouchDB from "pouchdb-browser";

export class AppPouchDB {
  private static instance: PouchDB.Database | undefined = undefined;
  private static dbName: string =
    process.env.NEXT_PUBLIC_POUCHDB_NAME || "pwa-notes-app";
  private static dbVersion: number = 1;

  constructor() {}

  static getInstance(): PouchDB.Database {
    if (this.instance === undefined) {
      console.log(
        "process.env.POUCHDB_NAME",
        process.env.NEXT_PUBLIC_POUCHDB_NAME
      );
      this.instance = new PouchDB(this.dbName);
      return this.instance;
    }

    return this.instance;
  }

  static async getDBnfo() {
    try {
      const db = this.getInstance();
      const info = await db.info();
      console.log("pouchdb info", info);
    } catch (error) {
      console.error("Error getting PouchDB info", error);
    }
  }
}
