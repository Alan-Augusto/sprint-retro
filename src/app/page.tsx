"use client";
import { useState } from "react";
import MessageForm from "./components/MessageForm";
import MessageList from "./components/MessageList";
export default function Home() {
  const [refresh, setRefresh] = useState(false);

  return (
    <main className="p-4 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">🚀 Retrospectiva Eagles 🦅 Sprint 1024</h1>
      <MessageForm onNewMessage={() => setRefresh((prev) => !prev)} />
      <MessageList refresh={refresh} />
    </main>
  );
}
