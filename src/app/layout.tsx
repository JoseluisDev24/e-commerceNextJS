import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import PersistentSidebar from "@/components/layout/sidebar/PersistentSidebar";
import Header from "../components/layout/header/Header";
import { ShoppingCartProvider } from "@/context/ShoppingCartContext";
import { AuthProvider } from "@/context/AuthContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import Footer from "@/components/layout/footer/Footer";

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
        <AuthProvider>
          <ShoppingCartProvider>
            <FavoritesProvider>
              <PersistentSidebar />
              <div className="md:ml-16">
                <Header />
                <main>{children}</main>
              </div>
            </FavoritesProvider>
          </ShoppingCartProvider>
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
