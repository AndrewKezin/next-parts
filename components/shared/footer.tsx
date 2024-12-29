import React from 'react';
import { Container } from './container';
import Link from 'next/link';

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
  return (
    <div className="w-full mt-8 min-h-[100px] bg-[#4D5053] flex items-center">
      <Container>
        <div className="w-full flex items-center justify-between py-5 px-5 gap-5">
          <p className="text-white text-base">NEXT PARTS © {new Date().getFullYear()}</p>
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
    </div>
  );
};
