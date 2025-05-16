export class AppIDB {
  private dbName = "pwa-notes-app";
  private dbVersion = 1;
  private db: IDBDatabase | null = null;
  private static instance: undefined | AppIDB = undefined;

  constructor() {
    const request = indexedDB.open(this.dbName, this.dbVersion);

    request.onsuccess = (event) => {
      console.log("onsuccess open idb", event);
      const db = (event.target as IDBOpenDBRequest).result;
      if (db) {
        this.db = db;
      }
    };

    request.onerror = (event) => {
      console.error("onerror open idb", event);
      this.db = null;
    };

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      console.log("onupdgradeneeded open idb", event);
      console.log("db", db);

      if (!db) {
        console.error("Something went wrong in onupgradeneeded(): no db");
        this.db = null;
        return;
      }

      this.db = db;
      const usersObjectStore = db.createObjectStore("users", {
        keyPath: "email",
      });
      const notesObjectStore = db.createObjectStore("notes", {
        keyPath: "noteId",
      });

      usersObjectStore.createIndex("email", "email", { unique: true });
      notesObjectStore.createIndex("title", "title", { unique: false });
    };
  }

  public static getInstance(): AppIDB {
    if (this.instance === undefined) {
      this.instance = new AppIDB();
      return this.instance;
    }
    return this.instance;
  }

  public static getDBName(): string {
    return this.getInstance().dbName;
  }

  public static getDBVersion(): number {
    return this.getInstance().dbVersion;
  }

  getData<T>(storeName: string): Promise<T[] | undefined> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject("Database not initialized");
      }

      const transaction = this.db.transaction(["users", "notes"], "readonly");
      transaction.oncomplete = (event) => {
        console.log("getData() - All done!", event);
      };

      transaction.onerror = (event) => {
        // Don't forget to handle errors!
        const error = (event.target as IDBTransaction).error;
        console.error("getData() - Transaction error", error);
      };

      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.getAll();
      request.onsuccess = (event) => {
        // event.target.result === customer.ssn;
        console.log("successfully get data");
        console.log(storeName, event.target);
        const result = (event.target as IDBRequest).result;
        return resolve(result);
      };
    });
  }

  getDataByKeyPath<T>(
    storeName: string,
    keyPath: string
  ): Promise<T | undefined> {
    console.log("idb getDataByKeyPath", storeName, keyPath);
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject("Database not initialized");
      }

      const transaction = this.db.transaction(["users", "notes"], "readonly");
      transaction.oncomplete = (event) => {
        console.log("getDataByKeyPath() - All done!", event);
      };

      transaction.onerror = (event) => {
        // Don't forget to handle errors!
        const error = (event.target as IDBTransaction).error;
        console.error("getDataByKeyPath() - Transaction error", error);
      };

      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.get(keyPath);
      request.onsuccess = (event) => {
        // event.target.result === customer.ssn;
        console.log("successfully get data by keypath");
        console.log(storeName, event.target);
        const result = (event.target as IDBRequest).result;
        return resolve(result);
      };
    });
  }

  addData<T, U>(storeName: string, data: T): Promise<U | undefined> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject("Database not initialized");
      }

      const transaction = this.db.transaction(["users", "notes"], "readwrite");
      transaction.oncomplete = (event) => {
        console.log("addData() - All done!", event);
      };

      transaction.onerror = (event) => {
        // Don't forget to handle errors!
        const error = (event.target as IDBTransaction).error;
        console.error("addData() - Transaction error", error);
      };

      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.add(data);
      request.onsuccess = (event) => {
        // event.target.result === customer.ssn;
        console.log("successfully add data");
        console.log(storeName, event.target);
        const result = (event.target as IDBRequest).result;
        return resolve(result);
      };
    });
  }

  updateData<T>(storeName: string, keyPath: string, data: T): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject("Database not initialized");
      }

      const transaction = this.db.transaction(["users", "notes"], "readwrite");
      transaction.oncomplete = (event) => {
        console.log("updateData() - All done!", event);
      };

      transaction.onerror = (event) => {
        // Don't forget to handle errors!
        const error = (event.target as IDBTransaction).error;
        console.error("updateData() - Transaction error", error);
      };

      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.get(keyPath);
      // const request = objectStore.add(data);
      request.onsuccess = (event) => {
        console.log("updateData() - onsuccess get", event);
        // event.target.result === customer.ssn;
        const retrievedData = (event.target as IDBRequest).result;
        const updatedData = {
          ...retrievedData,
          ...data,
        };
        const requestUpdate = objectStore.put(updatedData);
        requestUpdate.onsuccess = (event) => {
          console.log("successfully update data");
          console.log(storeName, event.target);
          resolve();
        };

        requestUpdate.onerror = (event) => {
          console.error("Error updating data", event);
          reject("Error updating data");
        };
      };
    });
  }

  deleteData(storeName: string, keyPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject("Database not initialized");
      }

      const transaction = this.db.transaction(["users", "notes"], "readwrite");
      transaction.oncomplete = (event) => {
        console.log("deleteData() - All done!", event);
      };

      transaction.onerror = (event) => {
        // Don't forget to handle errors!
        const error = (event.target as IDBTransaction).error;
        console.error("deleteData() - Transaction error", error);
      };

      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.delete(keyPath);
      request.onsuccess = (event) => {
        // event.target.result === customer.ssn;
        console.log("successfully delete data");
        console.log(storeName, event.target);
        resolve();
      };
    });
  }
}
