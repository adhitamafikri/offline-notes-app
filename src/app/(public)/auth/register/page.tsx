import { Input } from "@/components/ui/input";

export default function Register(): React.ReactNode {
  return (
    <div>
      <h1>Register to PWA Notes</h1>
      <form name="register-form">
        <Input placeholder="your Email" />
        <Input placeholder="Your password" type="password" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
