'use client';

import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { TOption } from './admin-product-select';
import Select, { OnChangeValue } from 'react-select';
import { Input } from '@/components/ui';
import { ItemElement } from './item-element';
import { cn } from '@/lib/utils';
import { Trash } from 'lucide-react';
import { useAdminSelectsOptions } from '@/hooks';
import { AdminNewProdForm, IProductForm } from './admin-new-prod-form';
import { AdminNewProdItemForm, IProductItemForm } from './admin-new-proditem-form';

export const AdminNewProduct = () => {
  // categoryId используется ПОСЛЕ отправки первой формы, чтобы выбранная категория для товара уже не менялась (disabled)
  const [categoryId, setCategoryId] = React.useState('');
  // selectedCateg используется ВО ВРЕМЯ изменения первой формы, чтобы оторбражать соответствующие опции во второй форме
  const [selectedCateg, setSelectedCateg] = React.useState<TOption>();
  const [productForm, setProductForm] = React.useState<IProductForm>();
  const [itemForm, setItemForm] = React.useState<IProductItemForm[]>([]);
  const [resetForm, setResetForm] = React.useState(false);
  const [resetItemForm, setResetItemForm] = React.useState(false);

  const {
    manufOptions,
    ingredOptions,
    categOptions,
    prodManufLoading,
    prodIngLoading,
    prodCatLoading,
  } = useAdminSelectsOptions();

  const onSubmit = (data: IProductForm) => {
    setProductForm(data);
    setCategoryId(data.category.label);
  };

  const onSubmitItem = (data: IProductItemForm) => {
    setItemForm((prevData) => [...prevData, data]);
    setResetItemForm(true);
  };

  console.log('productForm', productForm);
  console.log('itemForm', itemForm);

  const onSubmitFormSend = (productForm: IProductForm, itemForm: IProductItemForm[]) => {
    const formData = {
      id: productForm.id,
      name: productForm.name,
      imageUrl: productForm.imageUrl,
      categoryId: Number(productForm.category.value),
      ingredients: productForm.ingredients.map((ing) => ({
        id: Number(ing.value),
      })),
      gearboxesManufacturers: productForm.gearboxesManufacturers.map((gbm) => ({
        id: Number(gbm.value),
      })),
      items: itemForm.map((item) => ({
        productId: Number(item.id),
        quantityOfTeeth: Number(item.quantityOfTeeth),
        thickness: Number(item.thickness),
        volume: Number(item.volume),
        quantity: Number(item.quantity),
        price: Number(item.price),
      })),
    };

    setResetForm(true);
    setCategoryId('');
    setProductForm(undefined);
    setItemForm([]);
    console.log(formData);
  };

  const handleItemDelete = (id: string) => {
    const newItemForm = itemForm.filter((item) => item.id !== id);
    setItemForm(newItemForm);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center mb-2">
      <h2 className="text-2xl font-bold">Добавить новый товар</h2>

      <div className="w-full flex items-center justify-center gap-3 mb-5 p-3">
        <AdminNewProdForm
          categOptions={categOptions}
          manufOptions={manufOptions}
          ingredOptions={ingredOptions}
          prodCatLoading={prodCatLoading}
          prodManufLoading={prodManufLoading}
          prodIngLoading={prodIngLoading}
          categoryId={Number(categoryId)}
          setSelectedCateg={setSelectedCateg}
          resetForm={resetForm}
          setResetForm={setResetForm}
          onSubmit={onSubmit}
        />

        <AdminNewProdItemForm
          selectedCateg={selectedCateg as TOption}
          categoryId={categoryId}
          itemForm={itemForm}
          onSubmitItem={onSubmitItem}
          resetItemForm={resetItemForm}
          setResetItemForm={setResetItemForm}
          handleItemDelete={(id: string) => handleItemDelete(id)}
        />
      </div>

      {productForm && itemForm.length > 0 && (
        <button
          className="w-[300px] h-[50px] border border-gray-500 bg-gray-100 rounded-[5px] hover:bg-gray-200 transition-colors font-bold"
          onClick={() => onSubmitFormSend(productForm, itemForm)}>
          3. Отправить товары в БД
        </button>
      )}
    </div>
  );
};
