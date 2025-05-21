interface ConstructorParams {
  _id: string;
  noteId: string;
  bgImage?: string;
  icon?: string;
  title: string;
  content: string;
  footNote: string;
  userId: string;
  children?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export class Note {
  _id: string = "";
  noteId: string;
  bgImage: string = "";
  icon: string = "";
  title: string = "";
  content: string = "";
  footNote: string = "";
  userId: string = "";
  children?: string[] = [];
  createdAt?: string = ""; // date time in ISO string
  updatedAt?: string = ""; // date time in ISO string
  docType: string = "note";

  constructor({
    _id,
    noteId,
    bgImage,
    icon,
    title,
    content,
    footNote,
    userId,
    children,
    createdAt,
    updatedAt,
  }: ConstructorParams) {
    const isoDateNow = new Date().toISOString();
    this._id = _id || "";
    this.noteId = noteId || "";
    this.bgImage = bgImage || "";
    this.icon = icon || "";
    this.title = title;
    this.content = content;
    this.footNote = footNote;
    this.userId = userId;
    this.children = children || [];
    this.createdAt = createdAt || isoDateNow;
    this.updatedAt = updatedAt || isoDateNow;
  }
}
