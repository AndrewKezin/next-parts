'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token='798989e81b52c69e0521f85d547db8c67dbeb544'
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
