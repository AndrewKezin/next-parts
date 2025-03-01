import React from 'react';

interface Props {
  // Record - это утилита, которая создаёт новый объектный тип, ключами которого являются Keys, а значениями свойств — Type. В list будет передаваться enum, получаемый из схемы prisma
  list: Record<string, string>;
  value: string;
  defaultValue?: string;
  handleChange?: React.ChangeEventHandler<HTMLSelectElement>;
  className?: string;
}

// Простой select для списка из enum, загуженного из схемы prisma
export const SimpleSelect: React.FC<Props> = ({ list, value, defaultValue, handleChange, className }) => {
  return (
    <select onChange={handleChange} className={className} value={value} defaultValue={defaultValue} >
      <option value="">Не выбрано</option>
      {(Object.keys(list) as Array<keyof typeof list>).map((key) => (
        <option key={key as string} value={key as string}>
          {list[key]}
        </option>
      ))}
    </select>
  );
};
