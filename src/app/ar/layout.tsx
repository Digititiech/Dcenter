import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  title: "مركز القرار | استشارات مالية واقتصادية سيادية",
  description: "شريككم الاستراتيجي في صياغة المستقبل المالي في سلطنة عمان والمنطقة.",
};

export default function ArabicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      dir="rtl"
      className={`${notoArabic.variable} font-sans min-h-screen flex flex-col`}
      style={{ fontFamily: "var(--font-arabic), var(--font-sans)" }}
    >
      {children}
    </div>
  );
}
