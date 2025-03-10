import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const messages = await prisma.message.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(messages);
}

export async function POST(req: Request) {
  const { author, content, category } = await req.json();

  if (!author || !content || !category) {
    return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 });
  }

  const newMessage = await prisma.message.create({
    data: { author, content, category },
  });

  return NextResponse.json(newMessage);
}
