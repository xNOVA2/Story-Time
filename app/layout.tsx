import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/store/ReactQueryProvider";
import { AuthProvider } from "@/store/AuthProvider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Story Time ",
  description: "Admin Panel of Story Time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <AuthProvider>
          <body className={inter.className}>
            <Toaster position="top-right" richColors />
            {children}
          </body>
        </AuthProvider>
      </ReactQueryProvider>
    </html>
  );
}
