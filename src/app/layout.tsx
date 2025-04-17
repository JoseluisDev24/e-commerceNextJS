import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import PersistentSidebar from "@/components/layout/sidebar/PersistentSidebar";
import Header from "../components/layout/header/Header";
import { ShoppingCartProvider } from "@/context/ShoppingCartContext";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "e-Commerce",
  description: "E-commerce con Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <PersistentSidebar />
        <AuthProvider>
          <ShoppingCartProvider>
            <div className="md:ml-16">
              <Header />
              <main>{children}</main>
            </div>
          </ShoppingCartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
