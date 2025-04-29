'use client';

import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { TOption } from './admin-product-select';
import Select, { OnChangeValue } from 'react-select';
import { Input } from '@/components/ui';
import { ProductDTO } from '@/services/dto/cart.dto';
import { X } from 'lucide-react';
import { set } from 'lodash';

type Props = {
  categOptions: TOption[];
  manufOptions: TOption[];
  ingredOptions: TOption[];
};

export const AdminNewProduct = ({ categOptions, manufOptions, ingredOptions }: Props) => {
  const [productId, setProductId] = React.useState<number>(0);
  const [productForm, setProductForm] = React.useState({});
  const [itemForm, setItemForm] = React.useState({});

  const form = useForm({
    defaultValues: {
      id: '',
      name: '',
      category: '',
      imageUrl: '',
      gearboxesManufacturers: '',
      ingredients: '',
    },
  });

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

  const { control, handleSubmit, watch, reset } = form;
  const { control: itemControl, handleSubmit: handleSubmitItem, reset: resetItem } = itemsForm;

  // выбранная категория
  const selectedCateg = watch('category');

  const onSubmit = (data: ProductDTO) => {
    console.log(data);
    setProductForm(data);
    setProductId(data.id);
    reset();
  };

  const onSubmitItem = (data: any) => {
    console.log('innerForm', data);
    setItemForm(data);
    resetItem();
  };

  return (
    <div className="w-full flex flex-col items-center justify-center mb-2">
      <h2 className="text-2xl font-bold">Добавить новый товар</h2>

      <div className="w-full flex items-center justify-center gap-3 mb-5 p-3">
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="w-1/2">
            <div className="w-full flex flex-col items-center justify-center gap-1 border border-gray-300 p-3">
              <label htmlFor="id" className="mt-3">
                ID товара:
              </label>
              <Controller
                name="id"
                control={control}
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

              <label htmlFor="name" className="mt-3">
                Название:
              </label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    required
                    className="w-full bg-white rounded-none border border-gray-300"
                  />
                )}
              />

              <label htmlFor="category" className="mt-3">
                Категория:
              </label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    isSearchable={false}
                    name={field.name}
                    id={field.name}
                    value={field.value}
                    options={categOptions}
                    onChange={field.onChange}
                    className="w-[300px]"
                  />
                )}
              />

              <label htmlFor="imageUrl" className="mt-3">
                URL фото:
              </label>
              <Controller
                name="imageUrl"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    required
                    className="w-full bg-white rounded-none border border-gray-300"
                  />
                )}
              />

              <label htmlFor="gearboxesManufacturers" className="mt-3">
                Производители:
              </label>
              <Controller
                name="gearboxesManufacturers"
                control={control}
                render={({ field }) => (
                  <Select
                    isMulti
                    isSearchable={false}
                    name={field.name}
                    id={field.name}
                    value={field.value}
                    options={manufOptions}
                    onChange={field.onChange}
                    className="w-[300px]"
                  />
                )}
              />

              <label htmlFor="ingredients" className="mt-3">
                Дополнительно к товару:
              </label>
              <Controller
                name="ingredients"
                control={control}
                render={({ field }) => (
                  <Select
                    isMulti
                    isSearchable={false}
                    name={field.name}
                    id={field.name}
                    value={field.value}
                    options={ingredOptions}
                    onChange={field.onChange}
                    className="w-full"
                  />
                )}
              />
n
              <div className="flex justify-around w-full mt-5">
                <button
                  type="submit"
                  className="w-[300px] h-[50px] border border-gray-500 bg-gray-100 rounded-[5px] hover:bg-gray-200 transition-colors font-bold">
                  1. Добавить товар
                </button>

                <button
                  type="reset"
                  className="w-[100px] h-[50px] border border-gray-500 bg-gray-100 rounded-[5px] hover:bg-gray-200 transition-colors font-bold"
                  onClick={() => reset()}>
                  Сброс
                </button>
              </div>
            </div>
          </form>
        </FormProvider>

        <FormProvider {...itemsForm}>
          <form onSubmit={handleSubmitItem(onSubmitItem)} className="w-1/2">
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

              {selectedCateg.label === 'Диски' && (
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
                          type="number"
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
                          type="number"
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

              {selectedCateg.label === 'Масла' && (
                <div className="w-full flex flex-col items-center justify-center p-3">
                  <label htmlFor="volume" className="mt-3">
                    Объём канистры, л:
                  </label>
                  <Controller
                    name="volume"
                    control={itemsForm.control}
                    render={({ field }) => (
                      <Input
                        type="number"
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
                        type="number"
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
                        type="number"
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
                  type="submit"
                  className="w-[300px] h-[50px] border border-gray-500 bg-gray-100 rounded-[5px] hover:bg-gray-200 transition-colors font-bold">
                  2. Добавить вариант товара
                </button>

                <button
                  type="reset"
                  className="w-[100px] h-[50px] border border-gray-500 bg-gray-100 rounded-[5px] hover:bg-gray-200 transition-colors font-bold"
                  onClick={() => resetItem()}>
                  Сброс
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
