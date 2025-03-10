"use client";
import { useEffect, useState } from "react";

interface Message {
  id: string;
  author: string;
  content: string;
  category: string; // Adicionando a categoria aqui
}

export default function MessageList({ refresh }: { refresh: boolean }) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetchMessages();
  }, [refresh]); // Atualiza a lista sempre que 'refresh' mudar

  const fetchMessages = async () => {
    const res = await fetch("/api/messages");
    const data = await res.json();
    setMessages(data);
  };

  // Filtrando as mensagens por categoria
  const goodMessages = messages.filter((msg) => msg.category === "good");
  const badMessages = messages.filter((msg) => msg.category === "bad");
  const repeatMessages = messages.filter((msg) => msg.category === "repeat");

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Coluna: Foi bom */}
      <div>
        <h2 className="text-lg font-bold mb-2 text-green-600">🎉 Foi bom</h2>
        <div className="space-y-2">
          {goodMessages.map((msg) => (
            <div key={msg.id} className="border p-2 rounded bg-green-100">
              <strong>{msg.author}</strong>: {msg.content}
            </div>
          ))}
        </div>
      </div>

      {/* Coluna: Não foi bom */}
      <div>
        <h2 className="text-lg font-bold mb-2 text-red-600">😞 Não foi bom</h2>
        <div className="space-y-2">
          {badMessages.map((msg) => (
            <div key={msg.id} className="border p-2 rounded bg-red-100">
              <strong>{msg.author}</strong>: {msg.content}
            </div>
          ))}
        </div>
      </div>

      {/* Coluna: Queremos repetir */}
      <div>
        <h2 className="text-lg font-bold mb-2 text-blue-600">🌱 Queremos repetir</h2>
        <div className="space-y-2">
          {repeatMessages.map((msg) => (
            <div key={msg.id} className="border p-2 rounded bg-blue-100">
              <strong>{msg.author}</strong>: {msg.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
