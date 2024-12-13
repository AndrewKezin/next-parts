import React from 'react';

interface Props { 
    document: string;
    className?: string;
}

export const LegalInfo: React.FC<Props> = ({ document, className}) => {
    return (
        <>
            <p className='text-base text-grey-500 my-7'>{document}</p>
        </>
    );
}
