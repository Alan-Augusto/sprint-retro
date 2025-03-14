"use client";
import { useEffect } from "react";
import TeamDashboard from "../components/TeamDashboard";
import { setUserData } from "@/lib/utils";

export default function TeamPage({ params }: { params: { teamId: string } }) {
  useEffect(() => {
    setUserData({ teamId: params.teamId, teamName: "" }); // Define o ID do time no sessionStorage
  }, [params.teamId]);

  return <TeamDashboard teamId={params.teamId} />;
}
