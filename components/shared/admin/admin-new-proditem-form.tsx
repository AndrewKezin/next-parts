'use client';

import { Input } from '@/components/ui';
import { FilePen, Trash } from 'lucide-react';
import React, { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { ItemElement } from './item-element';
import { TOption } from './admin-product-select';
import { cn } from '@/lib/utils';
import { ConfirmPassword } from '../confirm-password';

interface Props {
  selectedCateg: TOption;
  categoryId: string;
  itemsArr: IProductItemForm[];
  setItemsArr: React.Dispatch<React.SetStateAction<IProductItemForm[]>>;
  onSubmitItem: (data: IProductItemForm) => void;
  handleItemDelete: (id: string) => void;
}

export interface IProductItemForm {
  id: string;
  quantityOfTeeth: string;
  thickness: string;
  quantity: string;
  volume: string;
  price: string;
}

export const AdminNewProdItemForm: React.FC<Props> = ({
  selectedCateg,
  categoryId,
  itemsArr,
  setItemsArr,
  onSubmitItem,
  handleItemDelete,
}) => {
  // itemId, который выбран для изменения
  const [currentItemId, setCurrentItemId] = useState('');
  const [isConfirmItemDelete, setIsConfirmItemDelete] = useState('');
  const [password, setPassword] = useState('');

  const itemsForm = useForm({
    defaultValues: {
      id: '',
      quantityOfTeeth: '',
      thickness: '',
      quantity: '',
      volume: '',
      price: '',
    },
  });

  const { handleSubmit: handleSubmitItem, reset: resetItem } = itemsForm;

  const handleItemEdit = (id: string) => {
    setCurrentItemId(id);
    const currentItemId = itemsArr.find((item) => item.id === id);

    itemsForm.reset(currentItemId);
  };

  const confirmItemDelete = (id: string) => {
    if (password === id) {
      handleItemDelete(id);
      setIsConfirmItemDelete('');
      setPassword('');
    } else {
      window.alert('Неверный код подтверждения');
    }
  };

  console.log('itemsArr', itemsArr);

  return (
    <FormProvider {...itemsForm}>
      <form
        onSubmit={handleSubmitItem((data) => {
          if (currentItemId === data.id) {
            const index = itemsArr.findIndex((item) => item.id === data.id);
            const newItemsArr = [...itemsArr];
            newItemsArr[index] = data;
            setItemsArr(newItemsArr);

            resetItem({
              id: '',
              quantityOfTeeth: '',
              thickness: '',
              quantity: '',
              volume: '',
              price: '',
            });
            setCurrentItemId('');
          } else if (itemsArr.every((item) => item.id !== data.id)) {
            onSubmitItem(data);
            resetItem({
              id: '',
              quantityOfTeeth: '',
              thickness: '',
              quantity: '',
              volume: '',
              price: '',
            });
          } else {
            window.alert('Вариант товара с таким артикулом уже есть!');
          }
        })}
        className="w-1/2">
        <div className="flex flex-col items-center justify-center border border-gray-300 gap-2 p-3">
          <div className="underline">Варианты исполнения:</div>

          <label htmlFor="id" className="mt-3">
            Артикул товара:
          </label>
          <Controller
            name="id"
            control={itemsForm.control}
            render={({ field }) => (
              <Input
                type="text"
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                required
                className="w-[200px] bg-white rounded-none border border-gray-300"
              />
            )}
          />

          {(selectedCateg?.label === 'Диски' || categoryId === 'Диски') && (
            <div className="w-full flex justify-around items-center gap-3">
              <div className="w-1/2 flex flex-col items-center justify-center p-1">
                <label htmlFor="quantityOfTeeth" className="mt-3">
                  Количество зубов диска:
                </label>
                <Controller
                  name="quantityOfTeeth"
                  control={itemsForm.control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      required
                      className="w-[100px] bg-white rounded-none border border-gray-300"
                    />
                  )}
                />
              </div>

              <div className="w-1/2 flex flex-col items-center justify-center p-1">
                <label htmlFor="thickness" className="mt-3">
                  Толщина диска:
                </label>
                <Controller
                  name="thickness"
                  control={itemsForm.control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      required
                      className="w-[100px] bg-white rounded-none border border-gray-300"
                    />
                  )}
                />
              </div>
            </div>
          )}

          {(selectedCateg?.label === 'Масла' || categoryId === 'Масла') && (
            <div className="w-full flex flex-col items-center justify-center p-3">
              <label htmlFor="volume" className="mt-3">
                Объём канистры, л:
              </label>
              <Controller
                name="volume"
                control={itemsForm.control}
                render={({ field }) => (
                  <Input
                    type="text"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    required
                    className="w-[100px] bg-white rounded-none border border-gray-300"
                  />
                )}
              />
            </div>
          )}

          <div className="w-full flex justify-around items-center gap-3">
            <div className="w-1/2 flex flex-col items-center justify-center p-3">
              <label htmlFor="quantity" className="mt-3">
                Количество, шт:
              </label>
              <Controller
                name="quantity"
                control={itemsForm.control}
                render={({ field }) => (
                  <Input
                    type="text"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    required
                    className="w-[100px] bg-white rounded-none border border-gray-300"
                  />
                )}
              />
            </div>

            <div className="w-1/2 flex flex-col items-center justify-center p-3">
              <label htmlFor="price" className="mt-3">
                Стоимость, ₽:
              </label>
              <Controller
                name="price"
                control={itemsForm.control}
                render={({ field }) => (
                  <Input
                    type="text"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    required
                    className="w-[100px] bg-white rounded-none border border-gray-300"
                  />
                )}
              />
            </div>
          </div>

          <div className="flex justify-around w-full">
            <button
              disabled={!categoryId}
              type="submit"
              className={cn(
                'w-[300px] h-[50px] border border-gray-500 bg-gray-100 rounded-[5px] hover:bg-gray-200 transition-colors font-bold',
                !categoryId && 'opacity-50 cursor-not-allowed',
              )}>
              {!currentItemId ? '2. Добавить вариант товара' : '2. Изменить вариант товара'}
            </button>

            <button
              type="reset"
              className="w-[100px] h-[50px] border border-gray-500 bg-gray-100 rounded-[5px] hover:bg-gray-200 transition-colors font-bold"
              onClick={() =>
                resetItem({
                  id: '',
                  quantityOfTeeth: '',
                  thickness: '',
                  quantity: '',
                  volume: '',
                  price: '',
                })
              }>
              Сброс
            </button>
          </div>

          {itemsArr.length > 0 && (
            <div className="w-full flex flex-col items-center justify-center gap-3 p-3 relative">
              {itemsArr.map((item) => (
                <div
                  className={cn(
                    'flex gap-2',
                    currentItemId === item.id && 'outline-2 outline outline-primary rounded-[3px]',
                  )}
                  key={item.id}>
                  <ItemElement item={item} categoryId={categoryId} />
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div
                      title="Удалить вариант"
                      onClick={() => setIsConfirmItemDelete(isConfirmItemDelete ? '' : item.id)}>
                      <Trash className="text-primary" cursor={'pointer'} />
                    </div>
                    <div title="Редактировать вариант" onClick={() => handleItemEdit(item.id)}>
                      <FilePen className="text-primary" cursor={'pointer'} />
                    </div>
                  </div>

                  <ConfirmPassword
                    className={cn(
                      'bg-white border border-red-500 rounded-[3px] flex justify-center items-center gap-2 p-2 absolute top-0 right-1/2 -translate-x-1/2',
                      { hidden: isConfirmItemDelete !== item.id },
                    )}
                    password={password}
                    setPassword={setPassword}
                    handleConfirm={() => confirmItemDelete(item.id)}
                    onClickCancel={() => {
                      setIsConfirmItemDelete('');
                      setPassword('');
                    }}
                    inputText="Введите артикул"
                    labelText={`Для подтвеждения удаления варинта товара введите ${item.id}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
