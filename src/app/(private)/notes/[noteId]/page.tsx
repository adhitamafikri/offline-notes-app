import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function EditNote(): React.ReactNode {
  return (
    <div>
      <h1>This is the edit note page</h1>
      <form name="edit-note-form">
        <Input placeholder="Your Note's Title" />
        <Textarea placeholder="Type your Notes here" />
      </form>
    </div>
  );
}
