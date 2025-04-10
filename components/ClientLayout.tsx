"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import ChatbotAssistant from "@/components/ui/ChatbotAssistant";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideLayout = pathname.startsWith("/login") || pathname.startsWith("/register");

  return (
    <>
      {!hideLayout && <Header />}
      <main>
        {!hideLayout && <ChatbotAssistant />}
        {children}
      </main>
      {!hideLayout && <Footer />}
    </>
  );
}
