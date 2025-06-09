'use client';

import React, { useState } from 'react';
import { ProductDTO } from '@/services/dto/cart.dto';
import { useDeleteProductMutation } from '@/store/redux';
import { SearchCheck, Trash } from 'lucide-react';
import Link from 'next/link';
import { ConfirmPassword } from '../confirm-password';
import { cn } from '@/lib/utils';
import { AdminProdCardItem } from './admin-prod-card-item';
import { confirmAdminPassword } from '@/lib/confirm-admin-password';
import toast from 'react-hot-toast';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

interface Props {
  product: ProductDTO;
}

export const AdminProductCard: React.FC<Props> = ({ product }) => {
  const [password, setPassword] = useState<string>('');
  const [onClickTrash, setOnClickTrash] = useState<boolean>(false);
  const [deleteProduct, { isSuccess, isError, error }] = useDeleteProductMutation();

  const handleDeleteConfirm = async () => {
    const { isConfirm, errorMessage } = await confirmAdminPassword( password, product.id, true );
    if(isConfirm) {
      const res = await deleteProduct(product.id);
      if (res.error) {
        // ниже попытка обойти типизацию ошибки
        const error = res.error as FetchBaseQueryError;
        const errorData = error.data as { message: string };
        toast.error(errorData.message);

      } else {
        toast.success(res.data.message);
      }
      setOnClickTrash(false);
    } else {
      errorMessage && toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center mb-2">
      <div className="w-full flex-col border border-primary rounded bg-white p-2">
        {/* Верхний блок */}
        <div className="w-full flex bg-white p-2">
          <div className="w-[100px] flex flex-col items-center justify-center border border-gray-300">
            <div className="underline">ID товара:</div>
            <div className="flex flex-col justify-center items-center relative">
              <Link
                href={`../product/${product.id}`}
                target="_blank"
                className="flex flex-col justify-center items-center">
                {product.id}
                <SearchCheck className="text-primary mb-2" />
              </Link>
              <button
                onClick={() => {
                  setOnClickTrash(!onClickTrash);
                }}>
                <Trash className="text-primary mt-1" />
              </button>
              <ConfirmPassword
                inputText="Введите id товара"
                labelText={`Будет удален товар и все варианты товара! Для подтверждения введите ${product.id}`}
                password={password}
                setPassword={setPassword}
                handleConfirm={handleDeleteConfirm}
                onClickCancel={() => setOnClickTrash(false)}
                className={cn(
                  'bg-white border border-red-500 rounded-[3px] flex justify-center items-center gap-2 absolute top-12 left-10 p-2',
                  { hidden: !onClickTrash },
                )}
              />
            </div>
          </div>
          <div className="w-[300px] flex flex-col flex-1 items-center justify-center border border-gray-300">
            <div className="underline">Название:</div>
            <div>{product.name}</div>
          </div>
          <div className="w-[100px] flex flex-col items-center justify-center border border-gray-300">
            <div className="underline">Категория:</div>
            <div>{product.category.name}</div>
          </div>
          <div className="w-[150px] h-[150px] flex flex-col items-center justify-center border border-gray-300">
            <img src={product.imageUrl} alt={product.name} />
          </div>
          <div className="w-[200px] flex flex-col items-center justify-center border border-gray-300">
            <div className="underline">Производители:</div>
            <div>{product.gearboxesManufacturers.map((item) => item.name).join(', ')}</div>
          </div>
        </div>

        {/* Нижний блок */}
        <div className="w-full flex bg-white p-2">
          {/* Нижний левый блок */}
          {product.ingredients.length > 0 && (
            <div className="w-[500px] flex flex-col items-start justify-center p-2 gap-2">
              <div className="underline">Дополнительно к товару:</div>
              {product.ingredients.map((item) => (
                <div className="flex items-center justify-center gap-1 " key={item.id}>
                  <div>
                    <img src={item.imageUrl} alt={item.name} width={100} height={100} />
                  </div>
                  <div className="flex flex-col">
                    <div>{item.name}</div>
                    <div>{item.price} ₽</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Нижний правый блок */}
          <div className="flex flex-1 flex-col items-center justify-center p-2 gap-2">
            {product.items.length > 1 && <div className="underline">Варианты:</div>}
            {product.items.length >= 1 &&
              product.items.map((item) => (
                <AdminProdCardItem item={item} hasBorder={product.items.length > 1} key={item.id} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
