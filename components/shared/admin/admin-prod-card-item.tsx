'use client';

import { ProductItem } from '@prisma/client';
import React, { useState } from 'react';
import { AdminProdCardItemProp } from './admin-prod-card-item-prop';
import { cn } from '@/lib/utils';
import { ConfirmPassword } from '../confirm-password';
import { Trash } from 'lucide-react';
import { confirmAdminPassword } from '@/lib/confirm-admin-password';
import { useDeleteProductItemMutation } from '@/store/redux';
import toast from 'react-hot-toast';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

interface Props {
  item: ProductItem;
  hasBorder: boolean;
  className?: string;
}

export const AdminProdCardItem: React.FC<Props> = ({ item, hasBorder, className }) => {
  const [onClickItemTrash, setOnClickItemTrash] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');

  const [deleteProductItem, { isSuccess, isError, error }] = useDeleteProductItemMutation();

  const handleDeleteItemConfirm = async (id: string) => {
    const { isConfirm, errorMessage } = await confirmAdminPassword(password, id, true);

    if (isConfirm) {
      const result = await deleteProductItem(id);
      if (result.error) {
        // ниже попытка обойти типизацию ошибки
        const error = result.error as FetchBaseQueryError;
        const errorData = error.data as { message: string };
        toast.error(errorData.message);
      } else {
        toast.success(result.data.message);
      }
      setOnClickItemTrash(false);
    } else {
      errorMessage && toast.error(errorMessage);
    }
  };

  return (
    <div
      className={cn('w-full flex flex-col items-center justify-center gap-1', {
        'border border-gray-300': hasBorder,
      })}
      key={item.id}>
      <div className="w-full flex justify-center items-center gap-1">
        <AdminProdCardItemProp text="Артикул товара" value={item.id} className="mx-1" />
        {item.quantityOfTeeth && (
          <AdminProdCardItemProp
            text="Кол-во зубов диска"
            value={item.quantityOfTeeth}
            className="mx-1"
          />
        )}

        {item.thickness && (
          <AdminProdCardItemProp
            text="Толщина диска"
            value={item.thickness}
            endText="мм"
            className="mx-1"
          />
        )}

        {item.volume && (
          <AdminProdCardItemProp
            text="Объём канистры масла"
            value={item.volume}
            endText="л"
            className="mx-1"
          />
        )}

        <AdminProdCardItemProp text="Стоимость" value={item.price} endText="₽" className="mx-1" />

        <AdminProdCardItemProp text="Кол-во" value={item.quantity} className="mx-1" />

        <button
          className="w-[40px] h-[40px] flex items-center justify-center"
          onClick={() => {
            setOnClickItemTrash(!onClickItemTrash);
            setPassword('');
          }}
          title="Удалить">
          <Trash className="text-primary  mt-1" />
        </button>
      </div>

      <ConfirmPassword
        inputText="Введите код"
        labelText={`Подтвердите удаление варианта товара. Введите код: ${item.id}`}
        password={password}
        setPassword={setPassword}
        handleConfirm={() => handleDeleteItemConfirm(item.id)}
        onClickCancel={() => {
          setOnClickItemTrash(false);
          setPassword('');
        }}
        className={cn(
          'bg-white border border-red-500 rounded-[3px] flex justify-center items-center gap-2 p-2 mb-2',
          { hidden: !onClickItemTrash },
        )}
      />
    </div>
  );
};
