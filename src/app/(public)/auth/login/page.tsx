import { Input } from "@/components/ui/input";

export default function Login(): React.ReactNode {
  return (
    <div>
      <h1>Login to PWA Notes</h1>
      <form name="login-form">
        <Input placeholder="your Email" />
        <Input placeholder="Your password" type="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
