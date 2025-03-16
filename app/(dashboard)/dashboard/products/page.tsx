'use client';

import React from 'react';
import { AdminProductCard, AdminProductSelect, AdminSearchInput } from '@/components/shared';
import {
  useAdminProductsSearch,
  useCategories,
  useIngredients,
  useManufacturers,
  useProductItemsVariants,
} from '@/hooks';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { X } from 'lucide-react';

export default function DashboardProducts() {
  const [productId, setProductId] = React.useState<string>('');
  const [productItemId, setProductItemId] = React.useState<string>('');
  const [productName, setProductName] = React.useState<string>('');
  const [productPrice, setProductPrice] = React.useState<[priceFrom: string, priceTo: string]>([
    '',
    '',
  ]);
  const [prodQuantVariants, setProdQuantVariants] = React.useState<string[]>([]);
  const [prodThicknVariants, setProdThicknVariants] = React.useState<string[]>([]);
  const [prodVolumeVariants, setProdVolumeVariants] = React.useState<string[]>([]);
  const [prodManufIds, setProdManufIds] = React.useState<string[]>([]);
  const [prodIngredIds, setProdIngredIds] = React.useState<string[]>([]);
  const [prodCatIds, setProdCatIds] = React.useState<string[]>([]);
  const [isClearInput, setIsClearInput] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);

  const { manufacturers: prodManuf, loading: prodManufLoading } = useManufacturers();
  const manufOptions = prodManuf.map((item) => {
    return { value: String(item.id), label: item.name };
  });

  const { ingredients: prodIng, loading: prodIngLoading } = useIngredients();
  const ingredOptions = prodIng.map((item) => {
    return { value: String(item.id), label: item.name };
  });

  const { categories: prodCat, loading: prodCatLoading } = useCategories();
  const categOptions = prodCat.map((item) => {
    return { value: String(item.id), label: item.name };
  });

  const {
    thicknessArr,
    quantityOfTeethArr,
    volumeArr,
    loading: prodItemsLoading,
  } = useProductItemsVariants();
  const prodThicknOptions = thicknessArr.map((item) => {
    return { value: String(item), label: String(item) };
  });
  const prodTeethOptions = quantityOfTeethArr.map((item) => {
    return { value: String(item), label: String(item) };
  });
  const prodVolOptions = volumeArr.map((item) => {
    return { value: String(item), label: String(item) };
  });

  React.useEffect(() => {
    if (productId || productItemId) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [productId, productItemId]);

  const handleClearSearch = () => {
    setProductId('');
    setProductItemId('');
    setProductName('');
    setProdManufIds([]);
    setProdIngredIds([]);
    setProdCatIds([]);
    setProductPrice(['', '']);
    setProdQuantVariants([]);
    setProdThicknVariants([]);
    setProdVolumeVariants([]);
    setIsClearInput(true);
  };

  const { fetchedProducts, loading } = useAdminProductsSearch({
    productId,
    productItemId,
    productName,
    prodManufIds,
    prodIngredIds,
    prodCatIds,
    productPrice,
    prodQuantVariants,
    prodThicknVariants,
    prodVolumeVariants,
  });

  const { products, totalCount } = fetchedProducts;

  console.log(products);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-4xl font-bold mt-10 mb-8">Панель управления товарами</h1>

      {/* Фильтр товаров */}
      <div className="w-full flex-col items-center justify-between border border-gray-300 p-3">
        <div className="flex items-center justify-between gap-3 p-2 w-full mb-3 border border-gray-300">

          {/* Поиск по id товара */}
          <AdminSearchInput
            searchQuery={productId}
            setSearchQuery={setProductId}
            title="ID товара"
            isClearInput={isClearInput}
            setIsClearInput={setIsClearInput}
            className="w-full mb-3"
            inputClassName="w-full h-[38px] rounded-[5px] border border-gray-300 bg-white pl-8 pr-3"
          />

          {/* Поиск по артикулу товара (productItemId) */}
          <AdminSearchInput
            searchQuery={productItemId}
            setSearchQuery={setProductItemId}
            title="Артикул товара"
            isClearInput={isClearInput}
            setIsClearInput={setIsClearInput}
            className="w-full mb-3"
            inputClassName="w-full h-[38px] rounded-[5px] border border-gray-300 bg-white pl-8 pr-3"
          />
        </div>

        <div className="flex items-center justify-between gap-3 p-2 w-full mb-3 border border-gray-300 ">
          {/* Поиск по названию */}
          <AdminSearchInput
            searchQuery={productName}
            setSearchQuery={setProductName}
            title="Название товара"
            isClearInput={isClearInput}
            setIsClearInput={setIsClearInput}
            className="w-full"
            inputClassName="w-full h-[38px] rounded-[5px] border border-gray-300 bg-white pl-8 pr-3"
            isDisabled={isDisabled}
          />

          {/* Селект по производителям */}
          <AdminProductSelect
            name="productManufacturer"
            id="productManufacturer"
            title="Производитель товара"
            value={prodManufIds}
            options={manufOptions}
            setValue={setProdManufIds}
            loading={prodManufLoading}
            isDisabled={isDisabled}
            placeholder="Производитель товара"
            className="w-full"
          />

          {/* Селект по категориям */}
          <AdminProductSelect
            name="productCategories"
            id="productCategories"
            title="Категории товара"
            value={prodCatIds}
            options={categOptions}
            setValue={setProdCatIds}
            loading={prodCatLoading}
            isDisabled={isDisabled}
            placeholder="Категории товара"
            className="w-full"
          />
        </div>

        <div className="flex items-center justify-between gap-3 p-2 border border-gray-300 w-full mb-3">
          {/* Селект по ингредиентам */}
          <AdminProductSelect
            name="productIngredients"
            id="productIngredients"
            title="Дополнительно к товару"
            value={prodIngredIds}
            options={ingredOptions}
            setValue={setProdIngredIds}
            loading={prodIngLoading}
            isDisabled={isDisabled}
            placeholder="Дополнительно к товару"
            className="w-full"
          />

          {/* Поиск по цене */}
          <div className="flex items-center justify-center w-full gap-5">
            <AdminSearchInput
              searchQuery={String(productPrice[0])}
              setSearchQuery={(value) => setProductPrice([String(value), productPrice[1]])}
              title="Цена товара, min"
              isClearInput={isClearInput}
              setIsClearInput={setIsClearInput}
              placeholder="min"
              className="w-[150px]"
              inputClassName="w-full h-[38px] rounded-[5px] border border-gray-300 bg-white pl-8 pr-3"
              isDisabled={isDisabled}
            />

            <AdminSearchInput
              searchQuery={String(productPrice[1])}
              setSearchQuery={(value) => setProductPrice([productPrice[0], String(value)])}
              title="Цена товара, max"
              isClearInput={isClearInput}
              setIsClearInput={setIsClearInput}
              placeholder="max"
              className="w-[150px]"
              inputClassName="w-full h-[38px] rounded-[5px] border border-gray-300 bg-white pl-8 pr-3"
              isDisabled={isDisabled}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 p-2 w-full mb-3 border border-gray-300">
          {/* Селект по толщине дисков */}
          <AdminProductSelect
            name="productThickness"
            id="productThickness"
            title="Толщина диска"
            value={prodThicknVariants}
            options={prodThicknOptions}
            setValue={setProdThicknVariants}
            loading={prodItemsLoading}
            isDisabled={isDisabled}
            placeholder="Толщина диска"
            className="w-[300px]"
          />

          {/* Селект по количеству зубьев */}
          <AdminProductSelect
            name="productTeeth"
            id="productTeeth"
            title="Количество зубьев"
            value={prodQuantVariants}
            options={prodTeethOptions}
            setValue={setProdQuantVariants}
            loading={prodItemsLoading}
            isDisabled={isDisabled}
            placeholder="Количество зубьев"
            className="w-[300px]"
          />

          {/* Селект по объему канистры масла */}
          <AdminProductSelect
            name="productVolume"
            id="productVolume"
            title="Объем канистры масла"
            value={prodVolumeVariants}
            options={prodVolOptions}
            setValue={setProdVolumeVariants}
            loading={prodItemsLoading}
            isDisabled={isDisabled}
            placeholder="Объем канистры масла"
            className="w-[300px]"
          />
        </div>

        <Button
          variant={'outline'}
          className="w-[250px] mb-5 border-black text-black bg-slate-100"
          onClick={handleClearSearch}>
          <X className="mr-2" />
          Сбросить параметры поиска
        </Button>
      </div>

      {/* Список товаров */}
      {loading && <p className="text-2xl p-5">Загрузка...</p>}
      {!loading && products[0] === null && (
        <p className="text-2xl p-5">Товары по выбранным параметрам не найдены</p>
      )}
      {!loading &&
        products &&
        products.length > 0 &&
        products[0] !== null &&
        products.map((product) => <AdminProductCard key={product.id} product={product} />)}

      <Link href="/dashboard" className="text-primary font-bold text-2xl mb-3">
        Вернуться в панель администратора
      </Link>
      <Link href="/dashboard/profile" className="text-primary font-bold text-xl mb-3">
        Перейти в профиль администратора
      </Link>
      <Link href="/dashboard/orders" className="text-primary font-bold text-xl mb-3">
        Перейти к управлению заказами
      </Link>
      <Link href="/dashboard/users" className="text-primary font-bold text-xl mb-3">
        Перейти к управлению профилями пользователей
      </Link>
    </div>
  );
}
