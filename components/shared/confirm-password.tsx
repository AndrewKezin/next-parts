'use client';

import React, { useEffect, useRef } from 'react';
import { Button } from '../ui';

interface Props {
  inputText: string;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleConfirm: () => void;
  onClickCancel: () => void;
  labelText?: string;
  className?: string;
}

export const ConfirmPassword: React.FC<Props> = ({
  inputText,
  password,
  setPassword,
  handleConfirm,
  onClickCancel,
  labelText,
  className,
}) => {
  const handleKeyPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleConfirm();
    }

    if (event.key === 'Escape') {
      onClickCancel();
    }
  };

  return (
    <div className={className} onKeyDown={handleKeyPressed}>
      {labelText && <label className="w-[170px]">{labelText}</label>}
      <input
        type="password"
        placeholder={inputText}
        className="w-[170px] border px-1 border-red-500"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        className="w-fit  bg-white border border-grey-500 text-black"
        disabled={!password}
        onClick={handleConfirm}>
        Подтвердить
      </Button>
      <Button className="w-fit bg-white border border-grey-500 text-black" onClick={onClickCancel}>
        Отмена
      </Button>
    </div>
  );
};
