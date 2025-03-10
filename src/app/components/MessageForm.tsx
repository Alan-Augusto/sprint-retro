"use client";
import { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

const categories = [
  { label: "😞 Não foi bom", value: "bad" },
  { label: "🎉 Foi bom", value: "good" },
  { label: "🌱 Queremos repetir", value: "repeat" },
];

export default function MessageForm({ onNewMessage }: { onNewMessage: () => void }) {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("good");
  const author = typeof window !== "undefined" ? localStorage.getItem("username") || "" : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author) {
      const name = prompt("Digite seu nome:");
      if (!name) return;
      localStorage.setItem("username", name);
    }

    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author, content, category }),
    });

    setContent("");
    onNewMessage();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded p-2 w-full">
        {categories.map((cat) => (
          <option key={cat.value} value={cat.value}>{cat.label}</option>
        ))}
      </select>
      <Input value={content} onChange={(e) => setContent(e.target.value)} placeholder="Escreva sua mensagem..." />
      <Button type="submit">Adicionar</Button>
    </form>
  );
}
