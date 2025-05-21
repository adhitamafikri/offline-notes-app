export const dbConfig = {
  users: {
    name: process.env.NEXT_PUBLIC_POUCHDB_USERS_NAME || "",
    index: {
      findUser: {
        fields: ["email", "userId", "createdAt"],
        name: "pna-find-user-index",
        ddoc: "pna-find-user-index-doc",
      },
    },
  },
  notes: {
    name: process.env.NEXT_PUBLIC_POUCHDB_NOTES_NAME || "",
    index: {
      notesList: {
        fields: ["userId", "createdAt"],
        name: "pna-note-list-index",
        ddoc: "pna-note-list-index-doc",
      },
      notesByTitle: {
        fields: ["userId", "title", "createdAt"],
        name: "pna-notes-by-title-index",
        ddoc: "pna-notes-by-title-index-doc",
      },
    },
  },
  userSettings: {
    name: process.env.NEXT_PUBLIC_POUCHDB_USER_SETTINGS_NAME || "",
    index: {
      findUserSettings: {
        fields: ["userId", "theme", "logo", "createdAt"],
        name: "pna-find-user-settings-index",
        ddoc: "pna-find-user-settings-index-doc",
      },
    },
  },
};
