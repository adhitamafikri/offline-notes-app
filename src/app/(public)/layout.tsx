import { Toaster } from "@/components/ui/sonner";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <h1>Public Layout</h1>
      {children}
      <Toaster />
    </div>
  );
}
