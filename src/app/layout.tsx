import type { Metadata } from "next";
import { nanumSquare } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "do it — Todo List",
  description: "할 일 목록을 관리하는 To Do 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${nanumSquare.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
