import React from 'react';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Title } from './title';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  title: string;
  text: string;
  className?: string;
  imageUrl?: string;
}

export const InfoBlock: React.FC<Props> = ({ className, title, text, imageUrl }) => {
  return (
    <div
      className={cn(
        className,
        `flex flex-col md:flex-row items-center justify-center w-full gap-5`,
      )}>
      <div className="flex flex-col justify-center items-center">
        <div className="px-10">
          <Title size="lg" text={title} className="font-extrabold text-center" />
          <p className="text-gray-400 text-lg text-center">{text}</p>
        </div>

        <div className="flex gap-5 mt-11">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft />
              На главную
            </Button>
          </Link>
          <a href="">
            <Button variant="outline" className="text-gray-500 border-gray-400 hover:bg-gray-50">
              Обновить
            </Button>
          </a>
        </div>
      </div>

      <div className="hidden sm:block sm:w-[200px] xl:w-[350px]">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            width={640}
            height={758}
            className="object-scale-down"
          />
        )}
      </div>
    </div>
  );
};
