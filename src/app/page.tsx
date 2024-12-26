"use client";

import { useEffect, useState } from "react";
import { Banner } from "./components/Banner";
import Header from "./components/Header";
import { Card } from "./components/Card";
import { api } from "@/service/api";
import { MovieProps } from "./types/movie";
import { toast } from "react-toastify";

export default function Movies() {
  const [movies, setMovies] = useState<MovieProps[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await api.get<{ movies: MovieProps[] }>(
          '/api/movies',
        )
        setMovies(response.data.movies)
      } catch (error) {
        toast.error('Erro ao carregar os dados')
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  return (
    <div className='relative bg-gradient-to-b pb-8'>
      <Header />
      <main className='relative pt-16 lg:space-y-24'>
        <Banner />
        <div className="grid grid-cols-1 pl-10 pr-10 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {movies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      </main>
    </div>
  );
}
