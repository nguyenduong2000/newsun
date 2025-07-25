
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import "./about/about.css";
import { FloatingContact } from "@/components/layout/floating-contact";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Breadcrumbs />
        {children}
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}
