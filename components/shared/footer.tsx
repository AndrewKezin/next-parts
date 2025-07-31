import React from 'react';
import { Container } from './container';
import Link from 'next/link';

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
  return (
    <footer className="w-full min-h-[100px] bg-[#4D5053] flex items-center">
      <Container>
        <div className="w-full flex flex-col items-start lg:flex-row lg:items-center lg:justify-between py-3 lg:py-5 px-5 gap-3 lg:gap-5">
          <p className="text-white text-base block  w-full lg:w-auto text-center">
            NEXT PARTS © {new Date().getFullYear()}
          </p>
          <p className="text-white text-base hover:text-primary cursor-pointer">
            <Link href="/about">О нас</Link>
          </p>
          <p className="text-white text-base hover:text-primary cursor-pointer">
            <Link href="/legal">Правовая информация</Link>
          </p>
          <p className="text-white text-base hover:text-primary cursor-pointer">
            <Link href="/about/contacts">Контакты</Link>
          </p>
          <p className="text-white text-base hover:text-primary cursor-pointer">
            <Link href="mailto:feedback@nextparts.none">feedback@nextparts.none</Link>
          </p>
        </div>
      </Container>
    </footer>
  );
};
