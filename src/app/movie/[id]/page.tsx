"use client";

import { useParams } from "next/navigation";
import { BiDownArrowCircle } from "react-icons/bi";
import { useEffect, useState } from "react";
import { MovieProps } from "../../../../types/movie";
import { Button } from "@/app/components/Button";
import { TokensIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { api } from "@/service/api";
import { toast } from "react-toastify";

export default function MoviePage() {
  const params = useParams();
  const [movie, setMovie] = useState<MovieProps>();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await api.get(
          `/api/movies?id=${params.id}`
        );
        setMovie(response.data);
      } catch (error) {
        toast.error('Erro ao carregar os dados');
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <TokensIcon className="h-20 w-20 animate-spin font-extralight text-white" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-white">Filme não encontrado!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-white px-4 md:px-8 lg:px-16 xl:px-60 py-8">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>

        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <Image
            src={movie.image}
            alt={movie.title}
            width={380}
            height={600}
            className="rounded-xl"
          />

          <div className="space-y-2 text-center sm:text-left">
            <p><strong className="text-lg">Ano:</strong> {movie.year}</p>
            <p><strong className="text-lg">Classificação:</strong> {movie.rated}</p>
            <p><strong className="text-lg">Lançamento:</strong> {movie.released}</p>
            <p><strong className="text-lg">Duração:</strong> {movie.runtime}</p>
            <p><strong className="text-lg">Gênero:</strong> {movie.genre}</p>
            <p><strong className="text-lg">Diretor:</strong> {movie.director}</p>
            <p><strong className="text-lg">Escritor:</strong> {movie.writer}</p>
            <p><strong className="text-lg">Atores:</strong> {movie.actors}</p>
            <p><strong className="text-lg">Idioma:</strong> {movie.language}</p>
            <p><strong className="text-lg">País:</strong> {movie.country}</p>
            <p><strong className="text-lg">Prêmios:</strong> {movie.awards}</p>
            <p><strong className="text-lg">IMDB Rating:</strong> {movie.imdbRating}</p>
            <Button
              icon={BiDownArrowCircle}
              title="Download Magnet"
              size="large"
              onClick={() => alert('Download via Torrents!')}
            ></Button>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">Descrição</h2>
          <p className="text-lg text-center md:text-left">{movie.description}</p>
        </div>
      </div>
    </div>
  );
}
