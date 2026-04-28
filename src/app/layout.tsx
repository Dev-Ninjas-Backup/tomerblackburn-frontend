import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "BBurnBuilders - Home Remodel - Chicago, Illinois",
  description: "Home Remodel - Chicago, Illinois",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AuthProvider>
          <ReactQueryProvider>
            {children}
            <Toaster position="top-right" richColors />
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
