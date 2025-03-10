import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sprintId = searchParams.get("sprintId");

  if (!sprintId) {
    return NextResponse.json({ error: "SprintId é obrigatório" }, { status: 400 });
  }

  const messages = await prisma.message.findMany({
    where: { sprintId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(messages);
}

export async function POST(req: Request) {
  const { author, content, category, sprintId } = await req.json();

  if (!author || !content || !category || !sprintId) {
    return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 });
  }

  const newMessage = await prisma.message.create({
    data: { author, content, category, sprintId },
  });

  return NextResponse.json(newMessage);
}
