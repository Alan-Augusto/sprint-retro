"use client";
import { useEffect, useState } from "react";
import SprintSelector from "./SprintSelector";
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";
import { clearUserData, setUserData } from "@/lib/utils";
import TopIcons from "./TopIcons";

export default function TeamDashboard({ teamId }: { teamId: string }) {
  const [teamName, setTeamName] = useState<string | null>(null);
  const [sprintId, setSprintId] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const res = await fetch(`/api/team/${teamId}`);
        const data = await res.json();

        if (data.error) {
          alert("Time não encontrado!");
          clearUserData()
          return;
        }

        setTeamName(data.name);
        setUserData({ teamId, teamName: data.name });
      } catch (error) {
        console.error("Erro ao buscar time:", error);
      }
    }

    fetchTeam();
  }, [teamId]);

  return (
    <main className="p-4 max-w-2xl mx-auto space-y-4">
      {teamName ? (
        <>
          <TopIcons teamId={teamId}/>
          <h1 className="text-2xl font-bold">🚀 Retrospectiva - Time {teamName}</h1>

          <SprintSelector
            teamId={teamId}
            onSprintSelected={(sprintId) => {
              setSprintId(sprintId);
              setUserData({ teamId, teamName, sprintId });
            }}
          />

          {sprintId && (
            <>
              <MessageForm sprintId={sprintId} onNewMessage={() => setRefresh((prev) => !prev)} />
              <MessageList sprintId={sprintId} refresh={refresh} />
            </>
          )}
        </>
      ) : (
        <p>Carregando time...</p>
      )}
    </main>
  );
}
