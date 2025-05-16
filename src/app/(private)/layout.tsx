import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  if (cookieStore.get("access_token") === undefined) {
    return redirect("/auth/login");
  }

  return (
    <div>
      <h1>Private Layout</h1>
      {children}
    </div>
  );
}
