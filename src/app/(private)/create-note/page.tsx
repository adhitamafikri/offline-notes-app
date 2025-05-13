import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CreateNote(): React.ReactNode {
  return (
    <div>
      <h1>This is the create note page</h1>
      <form name="create-note-form">
        <Input placeholder="Your Note's Title" />
        <Textarea placeholder="Type your Notes here" />
      </form>
    </div>
  );
}
