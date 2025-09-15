import "./globals.css";
import ChatbotWidget from "./components/ChatbotWidget";

export const metadata = {
  title: "Travel Website with AI Assistant",
  description: "Discover amazing travel destinations with our AI-powered assistant",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ChatbotWidget />
      </body>
    </html>
  );
}
