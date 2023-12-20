import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chatting with ChatGPT",
  description: "This is a chat app using the ChatGPT API",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="h-screen w-screen flex justify-center items-center">{children}</body>
    </html>
  );
}
