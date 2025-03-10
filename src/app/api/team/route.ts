import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const teams = await prisma.team.findMany();
  return NextResponse.json(teams);
}

export async function POST(req: Request) {
  const { name } = await req.json();
  if (!name) {
    return NextResponse.json({ error: "Nome do time é obrigatório" }, { status: 400 });
  }
  const newTeam = await prisma.team.create({ data: { name } });
  return NextResponse.json(newTeam);
}
