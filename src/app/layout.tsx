
import type { Metadata } from "next";
import "./globals.css";
import "./about/about.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/context/cart-context";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { AuthProvider } from "@/context/auth-context";

export const metadata: Metadata = {
  title: {
    default: "Newsun Reimagined - Điện máy công nghiệp",
    template: "%s | Newsun Reimagined",
  },
  description: "Tái tạo website dienmaynewsun.com với Next.js và ShadCN UI. Chuyên cung cấp thiết bị bếp công nghiệp, máy chế biến thực phẩm uy tín, chất lượng.",
  keywords: ["thiết bị bếp công nghiệp", "máy chế biến thực phẩm", "điện máy newsun"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Breadcrumbs />
                {children}
              </main>
              <Footer />
            </div>
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
