import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface BlogLayoutProps {
  children: ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16 pb-24">{children}</main>
      <Footer />
    </div>
  );
} 