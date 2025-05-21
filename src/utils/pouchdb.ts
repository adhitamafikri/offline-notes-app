export const pdbIndexes = {
  users: {
    fields: ["email", "userId", "createdAt"],
    name: "pna-users-index",
    ddoc: "pna-users-index-doc",
  },
  notes: {
    fields: ["docType", "userId", "createdAt"],
    name: "pna-notes-index",
    ddoc: "pna-notes-index-doc",
  },
  notesByTitle: {
    fields: ["docType", "userId", "title", "createdAt"],
    name: "pna-notes-by-title-index",
    ddoc: "pna-notes-by-title-index-doc",
  }
};
