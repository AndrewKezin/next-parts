import React from 'react';
import Link from 'next/link';

type Props = {
  url: string;
  children: React.ReactNode;
};

export const AdminNavMenuItem: React.FC<Props> = (props: Props) => {
  return (
    <Link href={props.url} className="text-primary font-bold text-xl mb-3">
      <div className="w-[200px] flex justify-center items-center gap-1 border border-primary py-1 px-3 rounded-full hover:bg-primary hover:text-white">
        {props.children}
      </div>
    </Link>
  );
};
