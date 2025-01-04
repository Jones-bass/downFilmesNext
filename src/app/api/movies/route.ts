import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { z } from "zod";

// Esquema de validação com zod
const movieSchema = z.object({
  title: z.string().min(1, { message: "O título é obrigatório." }),
  year: z.string().min(1, { message: "O year é obrigatório." }),
  runtime: z.string().min(1, { message: "O runtime é obrigatório." }),
  genre: z.string().min(1, { message: "O genre é obrigatório." }),
  director: z.string().min(1, { message: "O director é obrigatório." }),
  writer: z.string().min(1, { message: "O writer é obrigatório." }),
  actors: z.string().min(1, { message: "O actors é obrigatório." }),
  description: z.string().min(1, { message: "O description é obrigatório." }),
  language: z.string().min(1, { message: "O language é obrigatório." }),
  country: z.string().min(1, { message: "O country é obrigatório." }),
  image: z.string().min(1, { message: "O image é obrigatório." }),
  imdbRating: z.string().min(1, { message: "O imdbRating é obrigatório." }),
  type: z.string().min(1, { message: "O type é obrigatório." }),
});

// Função GET
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const search = searchParams.get("search");

  try {
    // Trecho de autenticação com Supabase
    if (code) {
      const supabase = createRouteHandlerClient({ cookies });
      await supabase.auth.exchangeCodeForSession(code);
    }

    // Lógica para buscar os filmes
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
      const movies = await prisma.movie.findMany({
        where: {
          OR: [{ title: { contains: search } }],
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
    console.log("Auth Callback", error);
    return NextResponse.json(
      { error: "Erro ao buscar os filmes." },
      { status: 500 }
    );
  }
}

// Função POST
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const validatedData = movieSchema.parse(data);

    const movie = await prisma.movie.create({
      data: validatedData,
    });

    return NextResponse.json({ message: "Criado com sucesso", movie });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}

// Função DELETE
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "ID é obrigatório para excluir um filme." },
      { status: 400 }
    );
  }

  try {
    const movie = await prisma.movie.findUnique({
      where: { id },
    });

    if (!movie) {
      return NextResponse.json(
        { error: "Filme não encontrado." },
        { status: 404 }
      );
    }

    await prisma.movie.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Filme excluído com sucesso." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao excluir o filme." },
      { status: 500 }
    );
  }
}

// Função PUT
export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "ID é obrigatório para editar um filme." },
      { status: 400 }
    );
  }

  try {
    const data = await req.json();
    const validatedData = movieSchema.parse(data);

    const movie = await prisma.movie.findUnique({
      where: { id },
    });

    if (!movie) {
      return NextResponse.json(
        { error: "Filme não encontrado." },
        { status: 404 }
      );
    }

    const updatedMovie = await prisma.movie.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(
      { message: "Filme atualizado com sucesso.", movie: updatedMovie },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Erro ao editar o filme." },
      { status: 500 }
    );
  }
}
