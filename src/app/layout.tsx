import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar/Navbar";

export const metadata: Metadata = {
  title: "PiQuiz",
  description: "Quiz yourself with Pi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/assets/images/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>

      <body className="bg-[url('../assets/images/background.jpg')] bg-cover bg-center">
        <Navbar />
        <div className="flex-1 flex w-full">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
