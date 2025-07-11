'use client';

import React, { useId } from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  defaultQuery?: string;
  onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange, defaultQuery }) => {
  const id = useId();
  

  return (
    <AddressSuggestions
      inputProps={{ className: 'h-[48px] w-full rounded-md border px-3 border focus:outline-none' }}
      token="798989e81b52c69e0521f85d547db8c67dbeb544"
      onChange={(data) => onChange?.(data?.value)}
      delay={300}
      defaultQuery={defaultQuery}
      uid={id}
    />
  );
};
