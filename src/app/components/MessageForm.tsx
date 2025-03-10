"use client";
import { useState, useEffect } from "react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";

const categories = [
  { label: "😞 Não foi bom", value: "bad" },
  { label: "🎉 Foi bom", value: "good" },
  { label: "🌱 Queremos repetir", value: "repeat" },
];

export default function MessageForm({ onNewMessage }: { onNewMessage: () => void }) {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("good");
  const [author, setAuthor] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Checa se há um nome salvo no sessionStorage ao carregar a página
  useEffect(() => {
    const storedName = sessionStorage.getItem("username");
    if (!storedName) {
      setIsModalOpen(true);
    } else {
      setAuthor(storedName);
    }
  }, []);

  const handleSaveName = () => {
    if (author.trim() === "") return;
    sessionStorage.setItem("username", author);
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author) return;

    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author, content, category }),
    });

    setContent("");
    onNewMessage();
  };

  return (
    <>
      {/* Modal para inserir o nome */}
      <Dialog open={isModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Digite seu nome</DialogTitle>
          </DialogHeader>
          <Input 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)} 
            placeholder="Seu nome..." 
          />
          <Button onClick={handleSaveName}>Salvar</Button>
        </DialogContent>
      </Dialog>

      {/* Formulário principal */}
      <form onSubmit={handleSubmit} className="space-y-2">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded p-2 w-full">
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
        <Input value={content} onChange={(e) => setContent(e.target.value)} placeholder="Escreva sua mensagem..." />
        <Button type="submit">Adicionar</Button>
      </form>
    </>
  );
}
