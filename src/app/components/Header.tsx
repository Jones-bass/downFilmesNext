'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <header
      className='fixed top-0 z-50 flex w-full items-center justify-between bg-gradient-to-t from-transparent to-black p-2 px-4 transition-all lg:px-16 lg:py-4'>
      <div className='flex items-center space-x-2 md:space-x-8'>
        <Link href='/'>
          Logo downFilmes
        </Link>
      </div>
      <div className='flex items-center space-x-2 md:space-x-8'>
        <form className='flex items-center space-x-2'>
          <button type='submit'>
          </button>
          <input
            type='search'
            id='search'
            name='search'
            placeholder='Search'
            className='bg-transparent text-white placeholder-white outline-none'
          />
        </form>

      </div>
    </header>
  );
}
