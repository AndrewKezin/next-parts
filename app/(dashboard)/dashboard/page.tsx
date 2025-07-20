import { AdminMonitor, AdminNavMenu } from '@/components/shared';
import React from 'react';

export default function Dashboard () {
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <h1 className='text-4xl font-bold mt-10 mb-10'>Администрирование магазина</h1>
            
            <AdminNavMenu page={'dashboard'} />

            <AdminMonitor />
        </div>
    );
}
