'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import Select, { OnChangeValue } from 'react-select';

export type TOption = {
  value: string;
  label: string;
};

interface Props {
  name: string;
  title: string;
  options: TOption[];
  value: string[];
  setValue: (value: string[]) => void;
  id?: string;
  isMulti?: boolean;
  loading?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
  className?: string;
}

export const AdminProductSelect: React.FC<Props> = ({
  name,
  title,
  options,
  value,
  setValue,
  id,
  isMulti = true,
  loading,
  isDisabled,
  placeholder,
  className,
}) => {
  const [selected, setSelected] = React.useState<TOption[]>([]);

  const handleChange = (selectedOptions: OnChangeValue<TOption, boolean>) => {
    setSelected(selectedOptions as TOption[]);
    setValue((selectedOptions as TOption[]).map((option) => option.value));
  };

  const getValues = () => {
    return selected.filter((option) => value.includes(option.value));
  };

  return (
    <div className={cn('flex flex-col gap-2 items-center', className)}>
      <p className="text-gray-600 text-sm ">{title}</p>

      {/* Библиотека react-select */}
      <Select
        isMulti={isMulti}
        isSearchable
        isLoading={loading}
        name={name}
        id={id}
        value={getValues()}
        placeholder={placeholder}
        options={options}
        onChange={handleChange}
        isDisabled={isDisabled}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    </div>
  );
};
