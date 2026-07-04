import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
});

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
    <div className={`${notoArabic.variable} min-h-screen bg-[#0D0D0C] text-[#E5E5E5] flex flex-col font-sans antialiased`}>
      {children}
    </div>
  );
}
