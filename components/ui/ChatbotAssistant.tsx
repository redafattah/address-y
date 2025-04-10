"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ChatbotAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [loadingReply, setLoadingReply] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, `🧑 ${userMessage}`]);
    setInput("");
    setLoadingReply(true);

    // Simulate assistant response
    setTimeout(() => {
      const response = getStaticResponse(userMessage);
      setMessages((prev) => [...prev, `🤖 ${response}`]);
      setLoadingReply(false);
    }, 1000);
  };

  // Static responses based on keywords
  const getStaticResponse = (message: string): string => {
    const msg = message.toLowerCase();

    if (msg.includes("hello") || msg.includes("bonjour")) {
      return "Bonjour ! Comment puis-je vous aider aujourd’hui ?";
    }
    if (msg.includes("réservation") || msg.includes("disponible")) {
      return "Vous pouvez réserver une chambre directement depuis la page de détails 😊";
    }
    if (msg.includes("merci")) {
      return "Avec plaisir ! N’hésitez pas si vous avez d’autres questions.";
    }
    if (msg.includes("prix") || msg.includes("tarif")) {
      return "Les prix varient selon la chambre et les dates choisies.";
    }

    return "Je suis encore en apprentissage 🤖 mais je ferai de mon mieux pour vous aider.";
  };

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <Button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-yellow-500 hover:bg-yellow-700 text-white rounded-full p-3 shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Chatbox Panel */}
      {open && (
        <div
          className="fixed bottom-6 right-6 z-50 w-[320px] h-[400px] bg-white border rounded-xl shadow-lg flex flex-col
          animate-in fade-in slide-in-from-bottom-6 duration-300 ease-out"
        >
          {/* Header */}
          <div className="p-4 border-b font-semibold text-gray-800 flex justify-between items-center">
            Assistant
            <button onClick={() => setOpen(false)} className="text-sm text-gray-500 hover:text-red-500">×</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2 text-sm text-gray-800">
            {messages.length === 0 ? (
              <p className="text-gray-500 italic">Comment puis-je vous aider ?</p>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className={`p-2 rounded-lg ${msg.startsWith("🤖") ? "bg-yellow-100" : "bg-gray-100"}`}>
                  {msg}
                </div>
              ))
            )}
            {loadingReply && (
              <div className="text-gray-400 italic">Assistant est en train de répondre...</div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Écrivez un message..."
              className="flex-1"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <Button onClick={handleSend} className="h-10 bg-yellow-500">Envoyer</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotAssistant;
