'use client';

import Link from 'next/link';
import { BiSearch } from 'react-icons/bi';
import { useScroll } from '../hooks/useScroll';
import logo from '../../../public/logo.png'
import Image from 'next/image';
import { CiLogin } from 'react-icons/ci';

export default function Header() {
  const isScrolled = useScroll();

  return (
    <header
      className={`${isScrolled && 'bg-black'}
      fixed top-0 z-50 flex w-full items-center justify-between bg-gradient-to-t from-transparent to-black p-2 px-4 transition-all lg:px-16 lg:py-4`}>
      <div className='flex items-center space-x-2 md:space-x-8'>
        <Link href='/'>
          <Image
            src={logo}
            alt='Logo'
            width={150}
            height={150}
            className='cursor-pointer'
          />
        </Link>

        <nav>
          <ul className='hidden md:flex md:space-x-4'>
            <Link href='/search?genre=Comedy' className='hover:text-gray-300 transition'>Comedia</Link>
            <Link href='/search?genre=Action' className='hover:text-gray-300 transition'> Ação</Link>
            <Link href='/search?genre=Adventure' className='hover:text-gray-300 transition'>Aventura</Link>
            <Link href='/search?genre=Animation' className='hover:text-gray-300 transition'>Animação</Link>
          </ul>
        </nav>

      </div>
      <div className='flex items-center space-x-2 md:space-x-8'>
        <form className='flex items-center space-x-2'>
          <button type='submit'>
            <BiSearch />
          </button>
          <input
            type='search'
            id='search'
            name='search'
            placeholder='Search'
            className='bg-transparent text-white placeholder-white outline-none'
          />
        </form>

        <Link href='/auth/login' className='flex items-center cursor-pointer space-x-2 hover:text-gray-300 transition'>
          <CiLogin className='text-lg' /> {/* Adicione ajuste no tamanho, se necessário */}
          <span>Área Membro</span>
        </Link>
      </div>
    </header>
  );
}
