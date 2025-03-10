"use client";
import { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { setUserData } from "@/lib/utils";

export default function TeamModal({ onTeamSelected }: { onTeamSelected: (teamId: string, teamName: string) => void }) {
  const [isOpen, setIsOpen] = useState(true);
  const [teamId, setTeamId] = useState("");
  const [newTeamName, setNewTeamName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleJoinTeam = async () => {
    if (!teamId.trim()) return;

    const res = await fetch(`/api/team/${teamId}`);
    const data = await res.json();
    if (data.id) {
      setUserData({ teamId: data.id, teamName: data.name });
      onTeamSelected(data.id, data.name);
      setIsOpen(false);
    } else {
      alert("Time não encontrado!");
    }
  };

  const handleCreateTeam = async () => {
    if (!newTeamName.trim()) return;

    const res = await fetch("/api/team", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newTeamName }),
    });

    const data = await res.json();
    if (data.id) {
      setUserData({ teamId: data.id, teamName: newTeamName });
      alert(`Seu time foi criado! ID: ${data.id}`);
      onTeamSelected(data.id, newTeamName);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Escolha um Time</DialogTitle>
        </DialogHeader>

        {!isCreating ? (
          <>
            <Input 
              value={teamId} 
              onChange={(e) => setTeamId(e.target.value)} 
              placeholder="Digite o ID do time..." 
            />
            <Button onClick={handleJoinTeam}>Entrar</Button>
            <p className="text-center my-2">ou</p>
            <Button onClick={() => setIsCreating(true)}>Criar um novo time</Button>
          </>
        ) : (
          <>
            <Input 
              value={newTeamName} 
              onChange={(e) => setNewTeamName(e.target.value)} 
              placeholder="Nome do novo time..." 
            />
            <Button onClick={handleCreateTeam}>Criar Time</Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
