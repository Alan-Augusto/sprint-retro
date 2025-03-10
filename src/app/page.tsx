"use client";
import { useState, useEffect } from "react";
import TeamModal from "./components/TeamModal";
import TeamDashboard from "./components/TeamDashboard";
import { getUserData } from "@/lib/utils";

export default function Home() {
  const [teamId, setTeamId] = useState<string | null>(null);

  useEffect(() => {
    const userData = getUserData();
    if (userData?.teamId) {
      setTeamId(userData.teamId);
    }
  }, []);

  return teamId ? <TeamDashboard teamId={teamId} /> : <TeamModal onTeamSelected={setTeamId} />;
}
