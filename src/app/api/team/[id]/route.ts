import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, context: { params: { id?: string } }) {
  const id = await context.params.id; // Aguarda a resolução dos parâmetros

  if (!id) {
    return NextResponse.json({ error: "ID do time não fornecido" }, { status: 400 });
  }

  try {
    const team = await prisma.team.findUnique({
      where: { id },
    });

    if (!team) {
      return NextResponse.json({ error: "Time não encontrado" }, { status: 404 });
    }

    return NextResponse.json(team);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar time", details: error }, { status: 500 });
  }
}
