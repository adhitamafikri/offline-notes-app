import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  if (cookieStore.has("access_token")) {
    return redirect("/");
  }

  return <div id="auth-layout">{children}</div>;
}
