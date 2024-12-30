import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const movieSchema = z.object({
  title: z.string().min(1, { message: "O título é obrigatório." }),
  year: z.string().min(1, { message: "O year é obrigatório." }),
  rated: z.string().min(1, { message: "O título é obrigatório." }),
  released: z.string().min(1, { message: "O released é obrigatório." }),
  runtime: z.string().min(1, { message: "O runtime é obrigatório." }),
  genre: z.string().min(1, { message: "O genre é obrigatório." }),
  director: z.string().min(1, { message: "O director é obrigatório." }),
  writer: z.string().min(1, { message: "O writer é obrigatório." }),
  actors: z.string().min(1, { message: "O actors é obrigatório." }),
  description: z.string().min(1, { message: "O description é obrigatório." }),
  language: z.string().min(1, { message: "O language é obrigatório." }),
  country: z.string().min(1, { message: "O country é obrigatório." }),
  awards: z.string().min(1, { message: "O awards é obrigatório." }),
  image: z.string().min(1, { message: "O image é obrigatório." }),
  imdbRating: z.string().min(1, { message: "O imdbRating é obrigatório." }),
  imdbVotes: z.string().min(1, { message: "O imdbVotes é obrigatório." }),
  type: z.string().min(1, { message: "O type é obrigatório." }),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const search = searchParams.get("search");

  try {
    if (id) {
      const movie = await prisma.movie.findUnique({
        where: { id },
      });

      if (!movie) {
        return NextResponse.json(
          { error: "Filme não encontrado." },
          { status: 404 }
        );
      }

      return NextResponse.json(movie);
    } else if (search) {
      // Busca por termo no título ou gênero
      const movies = await prisma.movie.findMany({
        where: {
          OR: [
            { title: { contains: search } },
          ],
        },
      });

      if (movies.length === 0) {
        return NextResponse.json(
          { message: "Nenhum filme encontrado." },
          { status: 404 }
        );
      }
      return NextResponse.json(movies);
    } else {

      const movies = await prisma.movie.findMany();
      return NextResponse.json({ movies });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar os filmes." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const validatedData = movieSchema.parse(data);

    const movie = await prisma.movie.create({
      data: {
        title: validatedData.title,
        year: validatedData.year,
        rated: validatedData.rated,
        released: validatedData.released,
        runtime: validatedData.runtime,
        genre: validatedData.genre,
        director: validatedData.director,
        writer: validatedData.writer,
        actors: validatedData.actors,
        description: validatedData.description,
        language: validatedData.language,
        country: validatedData.country,
        awards: validatedData.awards,
        image: validatedData.image,
        imdbRating: validatedData.imdbRating,
        imdbVotes: validatedData.imdbVotes,
        type: validatedData.type,
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
