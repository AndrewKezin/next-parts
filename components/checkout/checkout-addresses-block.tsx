'use client';

import { deleteUserAddress, updateUserAddresses } from '@/app/actions';
import { cn } from '@/lib/utils';
import { UserAddresses } from '@prisma/client';
import { Trash } from 'lucide-react';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { AddressInput } from '../shared';

interface Props {
  addresses: UserAddresses[];
  className?: string;
}

export const CheckoutAddressesBlock: React.FC<Props> = ({ addresses, className }) => {
  const [currentAddress, setCurrentAddress] = useState<number | null>(null);
  const [newAddress, setNewAddress] = useState<string | undefined>(undefined);

  const onClickAddressDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    const result = await deleteUserAddress(id);

    if (!result) {
      window.alert('Произошла ошибка при удалении адреса');
    }
    window.location.reload();
  };

  const { control } = useFormContext();

  // if (addresses.length === 0)
  //   return <h3 className="text-xl font-bold mb-5 text-center">Нет сохраненных адресов</h3>;

  const handleChangeAddress = (id: number, onChange: (addressId: number | null) => void) => {
    if (currentAddress === id) {
      setCurrentAddress(null);
      onChange(null);
    } else {
      setCurrentAddress(id);
      onChange(id);
    }
  };

  const addNewAddress = async (address: string | undefined) => {
    if (!address) {
      return window.alert('Введите адрес');
    }
    const result = await updateUserAddresses(address);

    if (!result) {
      window.alert('Произошла ошибка при добавлении адреса');
    }
    window.location.reload();

    setNewAddress('');
  };

  return (
    <>
      {addresses.length === 0 && <h3 className="text-xl font-bold mb-5 text-center">Нет сохраненных адресов</h3>}
      {addresses.length > 0 && (
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <div className="w-full flex flex-col gap-3 mb-5">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={cn(
                    'w-full flex gap-5 rounded-md bg-gray-200 py-3 md:py-5 px-3 hover:text-primary hover:border-primary cursor-pointer transition ease-in-out',
                    { 'border-2 border-primary bg-white': currentAddress === address.id },
                  )}
                  onClick={() => handleChangeAddress(address.id, field.onChange)}>
                  <div className="w-full flex justify-between items-center text-md">
                    {address.address}
                    {currentAddress === address.id && (
                      <div className="text-green-500 text-2xl p-1">✅</div>
                    )}

                    {/* Удаление адеса */}
                    <div
                      className="w-[30px] h-[30px] flex justify-center items-center border-2 border-gray-500 rounded-[5px] text-gray-500 cursor-pointer hover:border-primary"
                      onClick={(e) => onClickAddressDelete(e, address.id)}>
                      <Trash size={20} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        />
      )}
      <h3 className="text-md font-bold">Добавить новый адрес доставки: </h3>
      <AddressInput onChange={(value) => setNewAddress(value)} />
      <div
        onClick={() => addNewAddress(newAddress)}
        className="w-[200px] h-[40px] flex justify-center items-center rounded-md bg-primary text-white hover:bg-primary/80 transition ease-in-out">
        Добавить адрес
      </div>
    </>
  );
};
