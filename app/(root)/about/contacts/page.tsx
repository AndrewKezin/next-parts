import { Container } from '@/components/shared';
import React from 'react';

export default function ContactPage () {
    return (
        <Container>
            <h1 className='text-4xl font-bold mt-10 mb-5'>Контакты</h1>

            <div className="flex flex-col gap-3 py-7">
                <h2 className='text-2xl font-bold mb-3'>Юридический адрес:</h2>
                <p>Общество с ограниченной ответственностью "-----" (ООО "-----")</p>
                <p>ИНН: -----</p>
                <p>ОГРН: -----</p>
                <p>Юридический адрес: --------------</p>
                <p>Тел: ------------------------</p>
                <p>E-mail руководителя: ----------------------</p>
                <p>E-mail бухгалтера: ----------------------</p>
            </div>

            <div className="flex flex-col gap-3 py-7">
                <h2 className='text-2xl font-bold mb-3'>Фактический адрес:</h2>
                <p>Москва, --------------</p>
                <p>Тел отдела продаж: ------------------------</p>
                <p>E-mail отдела продаж: ----------------------</p>
                <p>E-mail отдела закупок: ----------------------</p>
            </div>
        </Container>
    );
}