import { Container } from '@/components/shared';
import Link from 'next/link';
import React from 'react';

export default function AboutPage() {
  return (
    <Container>
      <h1 className="text-4xl font-bold mt-10 mb-5">О нас</h1>

      <p className='text-xl'>
        Наш магазин запчастей для автоматических трансмиссий предлагает широкий ассортимент
        высококачественных деталей для всех типов и моделей трансмиссий. Мы сотрудничаем с ведущими
        производителями и гарантируем надежность и долговечность каждой запчасти. В нашем каталоге
        вы найдете все необходимое для ремонта и обслуживания автоматических трансмиссий, включая
        фильтры, прокладки, фрикционные диски и многое другое. Мы предлагаем конкурентоспособные
        цены и быструю доставку по всей стране. Наши специалисты всегда готовы помочь вам с выбором
        и предоставить консультацию по любым вопросам. Доверяйте профессионалам и обеспечьте долгую
        жизнь своей автоматической трансмиссии вместе с нами!
      </p>

      <h2 className="text-3xl font-bold mt-10 mb-5">Наши ценности:</h2>

      <ul>
        <li className="text-xl">- высококачественные запчасти</li>
        <li className="text-xl">- гарантированное качество запчастей</li>
        <li className="text-xl">- быстрая доставка</li>
        <li className="text-xl">- конкурентоспособные цены</li>
        <li className="text-xl">- квалифицированные специалисты</li>
      </ul>

      <h3 className="text-2xl font-bold mt-10 mb-5 underline">
        <Link href="/about/contacts" className="text-primary">
          Наши контакты
        </Link>
      </h3>
    </Container>
  );
}
