import Link from 'next/link';
import React from 'react';

export default function AdminPage () {
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <h1 className='text-4xl font-bold mt-10 mb-5'>Администрирование магазина</h1>
            
            <Link href="/profile" className="text-primary font-bold text-2xl">Перейти в профиль администратора</Link>
            <Link href="/dashboard" className='text-primary font-bold text-2xl'>Перейти в панель администратора</Link>
            <Link href="/orders" className='text-primary font-bold text-2xl'>Перейти к управлению заказами</Link>
            <Link href="/products" className='text-primary font-bold text-2xl'>Перейти к управлению товарами</Link>
            <Link href="/users" className='text-primary font-bold text-2xl'>Перейти к управлению профилями пользователей</Link>
        </div>
    );
}