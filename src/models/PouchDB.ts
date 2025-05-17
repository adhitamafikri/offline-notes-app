export interface IAppPouchDB {
  getInstance: () => PouchDB.Database;
  getDBInfo: () => Promise<void>;
}
