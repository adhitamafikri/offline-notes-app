"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useNotes } from "@/hooks/use-notes";
import { Note } from "@/models/Note";

export default function EditNote(): React.ReactNode {
  const params = useParams();
  const { notes } = useNotes();

  const [formData, setFormData] = useState<Note>({
    _id: "",
    noteId: "",
    bgImage: "",
    icon: "",
    title: "",
    content: "",
    footNote: "",
    userId: "",
    children: [],
    createdAt: "",
    updatedAt: "",
  });

  const loadSelectedNote = useCallback(async () => {
    const noteId = params.noteId;
    if (noteId) {
      const note = await notes.getNoteById(noteId.toString());
      if (!note) {
        throw new Error("Note not found");
      }
      setFormData({
        _id: note._id,
        noteId: note.noteId,
        bgImage: note.bgImage,
        icon: note.icon,
        title: note.title,
        content: note.content,
        footNote: note.footNote,
        userId: note.userId,
        children: note.children || [],
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
      });
    }
  }, [params, notes]);

  useEffect(() => {
    if (params.noteId) {
      console.log("params.noteId", params.noteId);
      loadSelectedNote();
    }
  }, [params, loadSelectedNote]);

  const onFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log("onFieldChange", name, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSaveNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await notes.updateNote(formData);
  };

  return (
    <form
      name="edit-note-form"
      className="w-full flex flex-col items-center justify-center gap-4 p-4"
      autoComplete="off"
      onSubmit={onSaveNote}
    >
      <h1>This is the edit note page</h1>

      <Input
        placeholder="Your Note's Title"
        name="title"
        defaultValue={formData.title}
        onChange={onFieldChange}
      />
      <Input
        placeholder="Your Note's Icon"
        name="icon"
        defaultValue={formData.icon}
        onChange={onFieldChange}
      />
      <Input
        placeholder="Your Note's background image"
        name="bgImage"
        defaultValue={formData.bgImage}
        onChange={onFieldChange}
      />
      <Textarea
        placeholder="Type your Notes here"
        name="content"
        defaultValue={formData.content}
        onChange={onFieldChange}
      />
      <Input
        placeholder="Your footnote here"
        name="footNote"
        defaultValue={formData.footNote}
        onChange={onFieldChange}
      />

      <Button type="submit" className="w-full">
        Save
      </Button>
    </form>
  );
}
