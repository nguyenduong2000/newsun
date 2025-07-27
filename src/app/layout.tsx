
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/context/cart-context";
import { AuthProvider } from "@/context/auth-context";

export const metadata: Metadata = {
  title: {
    default: "maythucpham365 Reimagined - Điện máy công nghiệp",
    template: "%s | maythucpham365",
  },
  description: "Tái tạo website maythucpham365.com Chuyên cung cấp thiết bị bếp công nghiệp, máy chế biến thực phẩm uy tín, chất lượng.",
  keywords: ["thiết bị bếp công nghiệp", "máy chế biến thực phẩm", "điện máy maythucpham365"],
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
              {children}
              <Toaster />
            </CartProvider>
          </AuthProvider>
      </body>
    </html>
  );
}
