'use client';

import { useEffect, useState } from 'react';
import { Container, LegalInfo } from "@/components/shared";


export default function UserAgreementPage() {
const [text, setText] = useState<string>('');

useEffect(() => {
    fetch('/assets/docs/useragreement.txt')
        .then((response) => response.text())
        .then((data) => setText(data.replace(/\r\n|\r/g, '\n')))
        .catch((error) => console.error('Error fetching the text file:', error));
}, []);

    return (
        <Container>
            <h1 className='text-4xl font-bold mt-10 mb-5'>Пользовательское соглашение</h1>
            <LegalInfo document={text} />
        </Container>
    );
}