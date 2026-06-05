import type { Metadata } from "next";

import { QueryProvider } from "@/shared/providers/query-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "운동숙제",
  description: "트레이너 워크스페이스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen font-sans">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
