"use client";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";

interface Sprint {
  id: string;
  name: string;
}

export default function SprintSelector({ teamId, onSprintSelected }: { teamId: string, onSprintSelected: (sprintId: string) => void }) {
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [selectedSprint, setSelectedSprint] = useState("");

  const fetchSprints = useCallback(async () => {
    const res = await fetch(`/api/sprint?teamId=${teamId}`);
    const data = await res.json();
    setSprints(data);
    if (data.length > 0) {
      setSelectedSprint(data[0].id);
      onSprintSelected(data[0].id);
    }
  }, [teamId, onSprintSelected]); // Dependências corrigidas

  useEffect(() => {
    fetchSprints();
  }, [fetchSprints]); // Agora `fetchSprints` está na lista

  const createSprint = async () => {
    const name = prompt("Digite o nome da nova sprint:");
    if (!name) return;

    const res = await fetch("/api/sprint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, teamId }),
    });

    const data = await res.json();
    fetchSprints();
  };

  return (
    <div className="flex items-center space-x-4">
      <select value={selectedSprint} onChange={(e) => { setSelectedSprint(e.target.value); onSprintSelected(e.target.value); }} className="border p-2 rounded">
        {sprints.map((sprint) => (
          <option key={sprint.id} value={sprint.id}>{sprint.name}</option>
        ))}
      </select>
      <Button onClick={createSprint}>Nova Sprint</Button>
    </div>
  );
}
