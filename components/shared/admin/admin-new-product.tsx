'use client';

import React, { useEffect } from 'react';
import { TOption } from './admin-product-select';
import { useAdminSelectsOptions } from '@/hooks';
import { AdminNewProdForm, IProductForm } from './admin-new-prod-form';
import { AdminNewProdItemForm, IProductItemForm } from './admin-new-proditem-form';
import { cn } from '@/lib/utils';
import { AddProductDTO, ProductDTO } from '@/services/dto/cart.dto';
import {
  useAddProductMutation,
  useCreateOrUpdateProductMutation,
  useGetProductQuery,
} from '@/store/redux';
import { NewProductSktn } from './skeletons';

type Props = {
  productId?: string;
  isProductEdit?: boolean;
  setIsProductEdit?: (value: boolean) => void;
};

export const AdminNewProduct: React.FC<Props> = ({
  productId,
  isProductEdit,
  setIsProductEdit,
}) => {
  // categoryId используется ПОСЛЕ отправки первой формы, чтобы выбранная категория для товара уже не менялась (disabled)
  const [categoryId, setCategoryId] = React.useState('');
  // selectedCateg используется ВО ВРЕМЯ изменения первой формы, чтобы оторбражать соответствующие опции во второй форме
  const [selectedCateg, setSelectedCateg] = React.useState<TOption>();
  const [productForm, setProductForm] = React.useState<IProductForm>();
  const [itemsArr, setItemsArr] = React.useState<IProductItemForm[]>([]);
  const [resetForm, setResetForm] = React.useState(false);
  const [defaultValues, setDefaultValues] = React.useState<ProductDTO | undefined>(undefined);

  const {
    manufOptions,
    ingredOptions,
    categOptions,
    prodManufLoading,
    prodIngLoading,
    prodCatLoading,
  } = useAdminSelectsOptions();

  const { data, isLoading: isLoadingProductData } = useGetProductQuery(productId);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  React.useEffect(() => {
    if (data) {
      const { products: products }: { products: ProductDTO[] } = data;
      const product = products[0];
      setDefaultValues(product);

      setCategoryId(product?.category?.name);

      product?.items?.forEach((item) => {
        setItemsArr((prevData) => [
          ...prevData,
          {
            id: String(item.id),
            thickness: String(item.thickness || ''),
            quantityOfTeeth: String(item.quantityOfTeeth || ''),
            volume: String(item.volume || ''),
            quantity: String(item.quantity),
            price: String(item.price),
          },
        ]);
      });
    }
  }, [data]);

  // const [addProduct, { isError: addError, isLoading: addLoading, isSuccess: addSuccess }] =
  //   useAddProductMutation();

  const [createOrUpdateProduct, { isError, isLoading, isSuccess }] =
    useCreateOrUpdateProductMutation();

  const onSubmit = (data: IProductForm) => {
    setProductForm(data);
    setCategoryId(data.category.label);
  };

  const onSubmitItem = (data: IProductItemForm) => {
    setItemsArr((prevData) => [...prevData, data]);
  };

  const onSubmitFormSend = (productForm: IProductForm, itemsArr: IProductItemForm[]) => {
    const formData: AddProductDTO = {
      id: productForm.id,
      name: productForm.name,
      imageUrl: productForm.imageUrl,
      categoryId: Number(productForm.category.value),
      ingredients: productForm.ingredients.map((ing) => ({
        id: ing.value,
      })),
      gearboxesManufacturers: productForm.gearboxesManufacturers.map((gbm) => ({
        id: Number(gbm.value),
      })),
      items: itemsArr.map((item) => ({
        id: item.id,
        productId: productForm.id,
        quantityOfTeeth: Number(item.quantityOfTeeth),
        thickness: Number(item.thickness),
        volume: Number(item.volume),
        quantity: Number(item.quantity),
        price: Number(item.price),
      })),
    };

    // Отправка данных на сервер
    createOrUpdateProduct(formData);

    // сброс форм
    setResetForm(true);
    setCategoryId('');
    setProductForm(undefined);
    setIsProductEdit && setIsProductEdit(false);
    setItemsArr([]);
  };

  // Удаление варианта товара
  const handleItemDelete = (id: string) => {
    const newItemsArr = itemsArr.filter((item) => item.id !== id);
    setItemsArr(newItemsArr);
  };

  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center mb-2">
        <h2 className="text-2xl font-bold">Добавление товара...</h2>
      </div>
    );
  }

  if (isSuccess) {
    setTimeout(() => {
      window.location.reload();
    }, 3000);

    return (
      <div className="w-full flex flex-col items-center justify-center mb-2">
        <h2 className="text-2xl font-bold">Товар добавлен</h2>
      </div>
    );
  }

  if (isError) {
    setTimeout(() => {
      window.location.reload();
    }, 3000);

    return (
      <div className="w-full flex flex-col items-center justify-center mb-2">
        <h2 className="text-2xl font-bold">Произошла ошибка при добавлении товара</h2>
      </div>
    );
  }

  if (isLoadingProductData) {
    return (
      <div className="w-full flex flex-col items-center justify-center mb-2">
        <h2 className="text-2xl font-bold mb-5">Загрузка данных о товаре...</h2>
        <NewProductSktn />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center mb-2">
      <h2 className="text-2xl font-bold mb-3">
        {isProductEdit ? 'Редактирование товара' : 'Добавить новый товар'}
      </h2>

      <div className="w-full flex items-center justify-center gap-3 mb-5 p-3">
        <AdminNewProdForm
          categOptions={categOptions}
          manufOptions={manufOptions}
          ingredOptions={ingredOptions}
          prodCatLoading={prodCatLoading}
          prodManufLoading={prodManufLoading}
          prodIngLoading={prodIngLoading}
          defaultValues={defaultValues}
          categoryId={categoryId}
          setSelectedCateg={setSelectedCateg}
          resetForm={resetForm}
          setResetForm={setResetForm}
          onSubmit={onSubmit}
        />

        <AdminNewProdItemForm
          selectedCateg={selectedCateg as TOption}
          categoryId={categoryId}
          itemsArr={itemsArr}
          setItemsArr={setItemsArr}
          onSubmitItem={onSubmitItem}
          handleItemDelete={(id: string) => handleItemDelete(id)}
        />
      </div>

      <button
        disabled={!productForm || !itemsArr.length}
        className={cn(
          'w-[300px] h-[50px] border border-gray-500 bg-gray-100 rounded-[5px] hover:bg-gray-200 transition-colors font-bold mb-3',
          !productForm || !itemsArr.length ? 'opacity-50 cursor-not-allowed' : '',
        )}
        onClick={() => productForm && itemsArr.length && onSubmitFormSend(productForm, itemsArr)}>
        {isProductEdit ? '3. Сохранить изменения в БД' : '3. Отправить товары в БД'}
      </button>
    </div>
  );
};
