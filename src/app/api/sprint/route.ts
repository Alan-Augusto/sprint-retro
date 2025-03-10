import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const teamId = searchParams.get("teamId");

  if (!teamId) {
    return NextResponse.json({ error: "TeamId é obrigatório" }, { status: 400 });
  }

  const sprints = await prisma.sprint.findMany({ where: { teamId } });
  return NextResponse.json(sprints);
}

export async function POST(req: Request) {
  const { name, teamId } = await req.json();
  if (!name || !teamId) {
    return NextResponse.json({ error: "Nome e teamId são obrigatórios" }, { status: 400 });
  }
  const newSprint = await prisma.sprint.create({ data: { name, teamId } });
  return NextResponse.json(newSprint);
}
