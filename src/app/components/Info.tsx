import Link from 'next/link';
import { BiDownArrowCircle } from 'react-icons/bi';
import { BsPlay, BsSpeakerFill } from 'react-icons/bs';
import { MovieProps } from '../types/movie';
import { MdDateRange } from 'react-icons/md';
import { Rated } from './Rated';

export const Info = ({ movie }: { movie: MovieProps }) => (
  <div className='absolute z-10 w-full rounded-b-md bg-zinc-800 p-4 shadow-lg transition hover:shadow-xl'>
    <div className='flex flex-row items-center justify-between gap-4'>
      <div className='flex flex-row items-center gap-4'>
        <div className='text-base font-bold text-white lg:text-lg'>
          {movie.title}
        </div>
        <div className='flex flex-row items-center gap-2 text-sm text-gray-400 lg:text-base'>
          <MdDateRange />
          <span className='text-xs lg:text-sm'>{movie.year}</span>
        </div>
      </div>

      <div className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-transparent transition hover:bg-neutral-300 hover:text-black'>
        <Link href='/'>
          <BiDownArrowCircle size={24} />
        </Link>
      </div>
    </div>

    <div className='mt-4 flex flex-col gap-3 text-sm text-gray-300'>
      <div className='flex flex-row items-center gap-3'>
        <BsSpeakerFill size={16} className='text-gray-400' />
        <span>Double Atmos 5.1 4K</span>
      </div>

      <div className='flex flex-row items-center gap-3'>
        <BsPlay size={16} className='text-gray-400' />
        <Rated rated={movie.rated} />
      </div>
    </div>

    <div className='mt-4 text-xs text-white lg:text-sm'>
      <p>{movie.genre.join(' · ')}</p>
    </div>
  </div>
);
