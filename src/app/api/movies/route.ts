import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod"; 

const movieSchema = z.object({
  title: z.string().min(1, { message: "O título é obrigatório." }),
});

export async function GET() {
  const movies = await prisma.movie.findMany();
  return NextResponse.json({ movies });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const validatedData = movieSchema.parse(data);

    const movie = await prisma.movie.create({
      data: {
        title: validatedData.title,
      },
    });

    return NextResponse.json({ message: "Criado com sucesso", movie });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}
