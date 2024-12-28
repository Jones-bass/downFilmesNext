"use client"

import { useState, useEffect } from "react";
import { MovieProps } from "../types/movie";
import { api } from "@/service/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { TokensIcon } from "@radix-ui/react-icons";
import { BiTrash } from "react-icons/bi";
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import logo from '../../../public/logo3.png'
import Image from "next/image";

export default function Dashboard() {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await api.get<{ movies: MovieProps[] }>("/api/movies");
        setMovies(response.data.movies);
      } catch (error) {
        toast.error("Erro ao carregar os filmes.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  const handleDelete = async (id: string,title: string) => {
    if (confirm(`"Tem certeza que deseja excluir este filme ${title}?"`)) {
      try {
        await api.delete(`/api/movies/${id}`);
        toast.success("Filme excluído com sucesso!");
        setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
      } catch (error) {
        toast.error("Erro ao excluir o filme.");
      }
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/edit/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <TokensIcon className="h-20 w-20 animate-spin font-extralight text-white" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center p-4 justify-between mb-4">
        <Image
          src={logo}
          alt='Logo'
          width={150}
          height={150}
          className='cursor-pointer ml-4 m-4'
        />

        <button
          onClick={() => router.push("/register")}
          className="flex items-center gap-2 bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded transition"
        >
          <FaPlusCircle /> 
          Adicionar
        </button>
      </div>

      <div className="overflow-x-auto p-2">
        <table className="table w-full">
          <thead>
            <tr className="text-gray-100 bg-neutral-700 text-2xl">
              <th className="px-4 py-2 text-start">Título</th>
              <th className="px-4 py-2 text-start">Gênero</th>
              <th className="px-4 py-2 text-start">Ano</th>
              <th className="px-4 py-2 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id} className="border-none">
                <td className="px-4 py-2">{movie.title}</td>
                <td className="px-4 py-2">{movie.genre}</td>
                <td className="px-4 py-2">{movie.year}</td>
                <td className="px-4 py-2">
                  <div className="flex justify-center gap-4">
                    <FaRegEdit
                      onClick={() => handleEdit(movie.id)}
                      className="text-white hover:text-blue-400 cursor-pointer transition-transform hover:scale-125"
                    />
                    <BiTrash
                      onClick={() => handleDelete(movie.id, movie.title)}
                      className="text-white hover:text-red-400 cursor-pointer transition-transform hover:scale-125"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
