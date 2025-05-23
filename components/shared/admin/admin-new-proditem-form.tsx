'use client';

import { Input } from '@/components/ui';
import { Trash } from 'lucide-react';
import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { ItemElement } from './item-element';
import { TOption } from './admin-product-select';
import { cn } from '@/lib/utils';

interface Props {
  selectedCateg: TOption;
  categoryId: string;
  itemForm: IProductItemForm[];
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
  itemForm,
  onSubmitItem,
  handleItemDelete,
}) => {
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

  return (
    <FormProvider {...itemsForm}>
      <form
        onSubmit={handleSubmitItem((data) => {
          if (itemForm.every((item) => item.id !== data.id)) {
            onSubmitItem(data);
            resetItem();
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
              2. Добавить вариант товара
            </button>

            <button
              type="reset"
              className="w-[100px] h-[50px] border border-gray-500 bg-gray-100 rounded-[5px] hover:bg-gray-200 transition-colors font-bold"
              onClick={() => resetItem()}>
              Сброс
            </button>
          </div>

          {itemForm.length > 0 && (
            <div className="w-full flex flex-col items-center justify-center gap-3 p-3">
              {itemForm.map((item) => (
                <div className="flex gap-2" key={item.id}>
                  <ItemElement item={item} categoryId={categoryId} />
                  <button onClick={() => handleItemDelete(item.id)}>
                    <Trash className="text-primary" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
