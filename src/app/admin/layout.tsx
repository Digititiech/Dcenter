import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Decision Center Admin | Management Portal",
  description: "Management portal for Decision Center administrators.",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#0D0D0C] text-[#E5E5E5] flex flex-col font-sans antialiased">
      {children}
    </div>
  );
}
