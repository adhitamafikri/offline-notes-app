interface ConstructorParams {
  bgImage?: string;
  icon?: string;
  title: string;
  content: string;
  footNote: string;
  userId: string;
}

export class Note {
  bgImage: string = "";
  icon: string = "";
  title: string = "";
  content: string = "";
  footNote: string = "";
  createdAt: string = ""; // date time in ISO string
  updatedAt: string = ""; // date time in ISO string
  userId: string = "";

  constructor({
    bgImage,
    icon,
    title,
    content,
    footNote,
    userId,
  }: ConstructorParams) {
    this.bgImage = bgImage || "";
    this.icon = icon || "";
    this.title = title;
    this.content = content;
    this.footNote = footNote;
    this.userId = userId;
  }
}
