import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://purunsol.org"),
  title: "푸른솔 정신건강의학과",
  description: "다시금 되찾을 당신의 일상을 응원합니다. 지친 마음을 쉬어갈 수 있는 편안한 공간에서 전문적인 정신건강 진료를 받아보세요.",
  openGraph: {
    title: "푸른솔 정신건강의학과",
    description: "다시금 되찾을 당신의 일상을 응원합니다.",
    url: "https://purunsol.org",
    siteName: "푸른솔 정신건강의학과",
    images: [
      {
        url: "/images/og-image.png",
        width: 1024,
        height: 1024,
        alt: "푸른솔 정신건강의학과 로고",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "푸른솔 정신건강의학과",
    description: "다시금 되찾을 당신의 일상을 응원합니다.",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="light">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background-light text-[#111418]">
        {children}
      </body>
    </html>
  );
}
