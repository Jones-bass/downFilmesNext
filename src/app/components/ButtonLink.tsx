
import Link from 'next/link';
import { IoPlayCircleOutline } from 'react-icons/io5';

interface ButtonLinkProps {
  href: string;
  text: string;
  icon?: JSX.Element;
}

export function ButtonLink({ href, text, icon }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className="flex cursor-pointer items-center gap-x-2 rounded bg-white px-5 py-1.5 text-sm font-semibold text-black transition hover:opacity-75 md:px-8 md:py-2.5"
    >
      {icon || <IoPlayCircleOutline className="h-6 w-6" />}
      {text}
    </Link>
  );
}
