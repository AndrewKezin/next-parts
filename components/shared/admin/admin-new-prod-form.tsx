'use client';

import { Input } from '@/components/ui';
import Select from 'react-select';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { TOption } from './admin-product-select';
import React, { useEffect } from 'react';
import { ProductDTO } from '@/services/dto/cart.dto';

interface Props {
  categOptions: TOption[];
  manufOptions: TOption[];
  ingredOptions: TOption[];
  prodCatLoading: boolean;
  prodManufLoading: boolean;
  prodIngLoading: boolean;
  categoryId: string;
  resetForm: boolean;
  defaultValues: ProductDTO | undefined;
  setSelectedCateg: (value: TOption) => void;
  setResetForm: (value: boolean) => void;
  onSubmit: (data: IProductForm) => void;
}

export interface IProductForm {
  id: string;
  name: string;
  category: TOption;
  imageUrl: string;
  gearboxesManufacturers: TOption[];
  ingredients: TOption[];
}

export const AdminNewProdForm: React.FC<Props> = ({
  onSubmit,
  categOptions,
  manufOptions,
  ingredOptions,
  prodCatLoading,
  prodManufLoading,
  prodIngLoading,
  categoryId,
  defaultValues,
  setSelectedCateg,
  resetForm,
  setResetForm,
}) => {
  useEffect(() => {
    if (defaultValues) {
      const defaultManufOptions: TOption[] = defaultValues.gearboxesManufacturers.map((item) => {
        return { value: String(item.id), label: item.name };
      });

      const defaultIngredOptions: TOption[] = defaultValues.ingredients.map((item) => {
        return { value: String(item.id), label: item.name };
      });

      const defaultCategOptions: TOption = {
        value: String(defaultValues.category.id),
        label: defaultValues.category.name,
      };

      form.reset({
        id: defaultValues.id,
        name: defaultValues.name,
        category: defaultCategOptions,
        imageUrl: defaultValues.imageUrl,
        gearboxesManufacturers: defaultManufOptions,
        ingredients: defaultIngredOptions,
      });
    }
  }, [defaultValues]);

  const form = useForm({
    defaultValues: {
      id: '',
      name: '',
      category: { value: '', label: '' } as TOption,
      imageUrl: '',
      gearboxesManufacturers: [] as TOption[],
      ingredients: [] as TOption[],
    } as IProductForm,
  });

  const { control, handleSubmit, watch, reset } = form;

  useEffect(() => {
    if (resetForm) {
      reset({
        id: '',
        name: '',
        category: { value: '', label: '' },
        imageUrl: '',
        gearboxesManufacturers: [],
        ingredients: [],
      });
      setResetForm(false);
    }
  }, [resetForm]);

  // выбранная категория
  const selectedCateg = watch('category');
  React.useEffect(() => {
    setSelectedCateg(selectedCateg);
  }, [selectedCateg]);

  return (
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
                required
                isDisabled={Boolean(categoryId)}
                isLoading={prodCatLoading}
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
            URL фото (символ "-" - отсутствие фото):
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
                className="w-full bg-white rounded-none border border-gray-300 mb-1"
              />
            )}
          />

          {watch('imageUrl') ? (
            watch('imageUrl') !== '-' ? (
              <img src={watch('imageUrl')} className="w-[200px] h-[200px]" alt={watch('name')} />
            ) : (
              <div className="flex items-center justify-center w-[200px] h-[200px] bg-gray-300">
                Нет фото
              </div>
            )
          ) : (
            <div className="flex items-center justify-center w-[200px] h-[200px] bg-gray-300">
              Добавьте URL фото
            </div>
          )}

          <label htmlFor="gearboxesManufacturers" className="mt-3">
            Производители:
          </label>
          <Controller
            name="gearboxesManufacturers"
            control={control}
            render={({ field }) => (
              <Select
                required
                isMulti
                isSearchable={false}
                name={field.name}
                id={field.name}
                value={field.value}
                defaultValue={manufOptions || []}
                isLoading={prodManufLoading}
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
                defaultValue={ingredOptions || []}
                isLoading={prodIngLoading}
                options={ingredOptions}
                onChange={field.onChange}
                className="w-full"
              />
            )}
          />

          <div className="flex justify-around w-full mt-5">
            <button
              type="submit"
              className="w-[300px] h-[50px] border border-gray-500 bg-gray-100 rounded-[5px] hover:bg-gray-200 transition-colors font-bold">
              1. Добавить товар
            </button>

            <button
              type="reset"
              className="w-[100px] h-[50px] border border-gray-500 bg-gray-100 rounded-[5px] hover:bg-gray-200 transition-colors font-bold"
              onClick={() =>
                reset({
                  id: '',
                  name: '',
                  category: { value: '', label: '' },
                  imageUrl: '',
                  gearboxesManufacturers: [],
                  ingredients: [],
                })
              }>
              Сброс
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
