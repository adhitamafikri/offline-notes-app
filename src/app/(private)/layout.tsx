import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LayoutSection from "./layout-section";

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  if (cookieStore.get("access_token") === undefined) {
    return redirect("/auth/login");
  }

  return <LayoutSection>{children}</LayoutSection>;
}
