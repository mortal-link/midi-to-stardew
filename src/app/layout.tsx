import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MIDI to Stardew Valley",
  description: "将 MIDI 文件转换为星露谷钢琴块配置",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
