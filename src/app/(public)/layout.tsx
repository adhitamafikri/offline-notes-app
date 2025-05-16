import { Toaster } from "@/components/ui/sonner";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div id="public-layout">
      <h1>Public Layout</h1>
      {children}
      <Toaster />
    </div>
  );
}
