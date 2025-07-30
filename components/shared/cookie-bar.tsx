'use client';

import Link from 'next/link';
import { Container } from './container';
import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';

export const CookieBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const consentFlag = Cookies.get('privacy-consent');
    if (!consentFlag) {
      setIsOpen(true);
    }
  }, []);
  const handleClickAccept = () => {
    Cookies.set('privacy-consent', 'true', { expires: 7 });
    setIsOpen(false);
  };

  if (isOpen) {
    return (
      <div className="fixed bottom-0 left-0 w-full flex backdrop-opacity-70 backdrop-brightness-0 bg-white/30 py-7 px-3 text-white z-50 animate-in">
        <Container>
          <div className="w-full flex flex-col sm:flex-row items-center sm:justify-between gap-2">
            <div className="flex-1 w-[280px] h-auto sm:w-full break-words">
              Мы используем cookies для быстрой и удобной работы сайта. Во время посещения сайта вы
              соглашаетесь с&nbsp;
              <Link href="/legal/privacy" target="_blank" className="hover:text-gray-700 underline">
                Политикой конфиденциальности
              </Link>
              ,&nbsp;
              <Link
                href="/legal/useragreement"
                target="_blank"
                className="hover:text-gray-700 underline">
                Пользовательским соглашением
              </Link>
              &nbsp;и&nbsp;
              <Link
                href="/legal/privacyrules"
                target="_blank"
                className="hover:text-gray-700 underline">
                Политикой в отношении обработки персональных данных
              </Link>
            </div>
            <div>
              <div
                className="w-[130px] h-[50px] bg-white rounded-full flex justify-center items-center cursor-pointer text-primary font-bold"
                onClick={handleClickAccept}>
                Соглашаюсь
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return null;
};
