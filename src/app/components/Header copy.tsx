'use client';

import Link from 'next/link';
import { BiSearch } from 'react-icons/bi';
import { useScroll } from '../hooks/useScroll';
import logo from '../../../public/logo.png'
import Image from 'next/image';
import { CiLogin } from 'react-icons/ci';
import { useState } from 'react';
import { MovieProps } from '../../../types/movie';
import { useRouter } from 'next/navigation';
import { api } from '@/service/api';
import { toast } from 'react-toastify';

export interface Movie {
  movie: MovieProps;
}

export default function Header() {
  const router = useRouter();

  const isScrolled = useScroll();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<MovieProps[]>([]);

  const goToLogin = () => {
    router.push('/auth/sign-in');
  };

  const goToIdMovie = ({ movie }: Movie) => {
    router.push(`/movie/${movie.id}`);
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }
  
    try {
      const response = await api.get(`/api/movies?search=${searchTerm}`);
      setSearchResults(response.data); // Define os resultados da API
    } catch (error) {
      toast.error('Erro ao buscar filmes.');
    }
  };
  
  const fetchMovieById = async (id: string) => {
    try {
      const response = await api.get(`/api/movies?id=${id}`);
      const movie = response.data;
  
      // Redireciona para a página do filme com o ID
      router.push(`/movie/${id}`);
    } catch (error) {
      toast.error('Erro ao carregar os dados do filme.');
    }
  };
  


  return (
    <>
      <header
        className={`${isScrolled && 'bg-black'}
      fixed top-0 z-50 flex w-full items-center justify-between bg-gradient-to-t from-transparent to-black p-2 px-4 transition-all lg:px-16 lg:py-4`}>
        <div className='flex items-center space-x-2 md:space-x-8'>
          <Link href='/'>
            <Image
              src={logo}
              alt='Logo'
              width={130}
              height={130}
              className='cursor-pointer'
            />
          </Link>

        </div>
        <div className='flex items-center space-x-2 md:space-x-8'>
          <form className='flex items-center space-x-2'
            onSubmit={handleSearch}
          >
            <button type='submit'>
              <BiSearch />
            </button>
            <input
              type='search'
              id='search'
              name='search'
              placeholder='Search'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='bg-transparent text-white outline-none'
            />
          </form>

          <button onClick={goToLogin} className='flex items-center cursor-pointer space-x-2 hover:text-gray-300 transition'>
            <CiLogin className='text-lg' />
            <span className="hidden sm:block text-sm md:text-lg">Área Membro</span>
          </button>
        </div>
      </header>

      {searchResults.length > 0 && (
        <div className="absolute cursor-pointer bg-red-400 top-6 md:top-12 lg:top-14 right-4 md:right-40 lg:right-60 bg-opacity-90 p-2 text-white">
          {searchResults.map((movie: MovieProps) => (
            <button 
            key={movie.id}
    onClick={() => fetchMovieById(movie.id)} >
            
              <div className="flex items-center space-x-4">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-12 h-16 object-cover"
                />
                <div>
                  <h3 className="font-bold text-lg">{movie.title}</h3>
                  <p className="font-thin text-sm">{movie.genre}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {searchTerm && searchResults.length === 0 && (
        <div className="absolute top-16 right-72 bg-opacity-90 p-4 text-white">
          <p>Nenhum resultado encontrado para "{searchTerm}"</p>
        </div>
      )}
    </>
  );
}
