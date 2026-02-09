import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "푸른솔 정신건강의학과",
  description: "다시금 되찾을 당신의 일상을 응원합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background-light dark:bg-background-dark text-[#111418] dark:text-gray-100 transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
