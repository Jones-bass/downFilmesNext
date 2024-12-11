'use client';

import Link from 'next/link';
import { BiSearch } from 'react-icons/bi';
import { useScroll } from '../hooks/useScroll';
import logo from '../../../public/logo.png'
import Image from 'next/image';
import { CiLogin } from 'react-icons/ci';
import { useState } from 'react';
import { MovieProps } from '../types/movie';
import { moveInfo } from '../utils/moveInfo'

export default function Header() {
  const isScrolled = useScroll();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<MovieProps[]>([]);

  const handleSearch = (e: any) => {
    e.preventDefault();

    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = moveInfo.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
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

          <Link href='/auth/login' className='flex items-center cursor-pointer space-x-2 hover:text-gray-300 transition'>
            <CiLogin className='text-lg' />
            <span className="hidden sm:block text-sm md:text-lg">Área Membro</span>
          </Link>
        </div>
      </header>

      {searchResults.length > 0 && (
        <div className="absolute top-6 md:top-12 lg:top-14 right-4 md:right-40 lg:right-60 bg-opacity-90 p-2 text-white">
          <ul>
            {searchResults.map((movie: MovieProps) => (
              <li key={movie.id} className="py-2 border-b border-gray-600">
                <Link href={`/movie/${movie.id}`}>
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
                </Link>
              </li>
            ))}
          </ul>
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
