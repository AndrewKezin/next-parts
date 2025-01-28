import React from 'react';
import { Button } from '../ui';

interface Props {
    inputText: string;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    handleConfirm: () => void;
    onClickCancel: () => void;
    className?: string;
}

export const ConfirmPassword: React.FC<Props> = ({inputText,password, setPassword, handleConfirm, onClickCancel, className}) => {
    return (
        <div className={className}>
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
            <Button
              className="w-fit bg-white border border-grey-500 text-black"
              onClick={onClickCancel}>
              Отмена
            </Button>
        </div>
    );
}