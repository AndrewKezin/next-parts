import { deleteUserAddress } from '@/app/actions';
import { UserAddresses } from '@prisma/client';
import { Trash } from 'lucide-react';
import React from 'react';

interface Props {
  addresses: UserAddresses[];
}

export const ProfileAddresses: React.FC<Props> = ({ addresses }) => {
  const onClickAddressDelete = async (id: number) => {
    const result = await deleteUserAddress(id);

    if (!result) {
      window.alert('Произошла ошибка при удалении адреса');
    }
    window.location.reload();
  };

  if (!addresses)
    return <h3 className="text-xl font-bold mb-5 text-center">Адреса доставки не найдены</h3>;

  return (
    <>
      <h3 className="text-xl font-bold mb-2">Мои адреса доставки:</h3>
      <div className="w-full flex flex-col mb-5">
        {addresses.length > 0 &&
          addresses.map((address) => (
            <div
              key={address.id}
              className="w-full flex gap-5 border-b border-b-gray-300 last:border-b-0 py-5 px-2 hover:text-primary">
              <div className="w-full flex justify-start items-center text-md">
                {address.address}
              </div>

              <div
                className="flex gap-1 text-grey-500 cursor-pointer underline w-fit"
                onClick={() => onClickAddressDelete(address.id)}>
                <Trash size={20} className="ml-2" />
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
