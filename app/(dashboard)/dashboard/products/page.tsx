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
  const [productName, setProductName] = React.useState<string>('');
  const [productPrice, setProductPrice] = React.useState<[priceFrom: string, priceTo: string]>(['', '']);
  const [prodQuantVariants, setProdQuantVariants] = React.useState<string[]>([]);
  const [prodThicknVariants, setProdThicknVariants] = React.useState<string[]>([]);
  const [prodVolumeVariants, setProdVolumeVariants] = React.useState<string[]>([]);
  const [prodManufIds, setProdManufIds] = React.useState<string[]>([]);
  const [prodIngredIds, setProdIngredIds] = React.useState<string[]>([]);
  const [prodCatIds, setProdCatIds] = React.useState<string[]>([]);
  const [isClearInput, setIsClearInput] = React.useState(false);

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


  const handleClearSearch = () => {
    setProductId('');
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
      <div className="w-full flex-col items-center justify-between mb-5 border border-gray-300 p-3">
        {/* Поиск по артикулу (id товара) */}
        <AdminSearchInput
          searchQuery={productId}
          setSearchQuery={setProductId}
          title="Артикул (id) товара"
          isClearInput={isClearInput}
          setIsClearInput={setIsClearInput}
          className="w-[200px]"
        />

        {/* Поиск по названию */}
        <AdminSearchInput
          searchQuery={productName}
          setSearchQuery={setProductName}
          title="Название товара"
          isClearInput={isClearInput}
          setIsClearInput={setIsClearInput}
          className="w-[200px]"
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
          placeholder="Производитель товара"
          className="w-[600px]"
        />

        {/* Селект по ингредиентам */}
        <AdminProductSelect
          name="productIngredients"
          id="productIngredients"
          title="Дополнительно к товару"
          value={prodIngredIds}
          options={ingredOptions}
          setValue={setProdIngredIds}
          loading={prodIngLoading}
          placeholder="Дополнительно к товару"
          className="w-[600px]"
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
          placeholder="Категории товара"
          className="w-[600px]"
        />

        {/* Поиск по цене */}
        <div className="flex items-center justify-center w-full border border-gray-300 gap-3">
          <AdminSearchInput
            searchQuery={String(productPrice[0])}
            setSearchQuery={(value) => setProductPrice([String(value), productPrice[1]])}
            title="Цена товара, min"
            isClearInput={isClearInput}
            setIsClearInput={setIsClearInput}
            placeholder="min"
            className="w-[150px]"
          />

          <AdminSearchInput
            searchQuery={String(productPrice[1])}
            setSearchQuery={(value) => setProductPrice([productPrice[0], String(value)])}
            title="Цена товара, max"
            isClearInput={isClearInput}
            setIsClearInput={setIsClearInput}
            placeholder="max"
            className="w-[150px]"
          />
        </div>

        {/* Селект по толщине дисков */}
        <AdminProductSelect
          name="productThickness"
          id="productThickness"
          title="Толщина диска"
          value={prodThicknVariants}
          options={prodThicknOptions}
          setValue={setProdThicknVariants}
          loading={prodItemsLoading}
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
          placeholder="Объем канистры масла"
          className="w-[300px]"
        />

        <Button
          variant={'outline'}
          className="w-[250px] mb-5 border-black text-black bg-slate-100"
          onClick={handleClearSearch}>
          <X className="mr-2" />
          Сбросить параметры поиска
        </Button>
      </div>

      {/* Список товаров */}
      {products && products.length > 0 && (
      //   <table className="table w-full mb-5 border-collapse border border-black bg-slate-100">
      //   <thead className="bg-slate-200 border border-black">
      //     <tr>
      //       <th className="border border-black">ID</th>
      //       <th className="border border-black">Название</th>
      //       <th className="border border-black">Производитель</th>
      //       <th className="border border-black">Цена</th>
      //       <th className="border border-black">Категория</th>
      //       <th className="border border-black">Ингредиенты</th>
      //       <th className="border border-black">Толщина диска</th>
      //       <th className="border border-black">Количество зубьев</th>
      //       <th className="border border-black">Объем канистры масла</th>
      //     </tr>
      //   </thead>
      //   <tbody>
      //     {loading ? (
      //       <tr>
      //         <td className="border border-black">Загрузка...</td>
      //       </tr>
      //     ) : (
      //       fetchedProducts.products.map((product) => (
      //         <tr key={product.id}>
      //           <td className="border border-black">{product.id}</td>
      //           <td className="border border-black">{product.name}</td>
      //           <td className="border border-black">{product.gearboxesManufacturers.map((manuf) => (manuf.name)).join(', ')}</td>
      //           <td className="border border-black"> руб.</td>
      //           {/* <td className="border border-black">{product.category}</td>
      //           <td className="border border-black">{product.ingredients}</td>
      //           <td className="border border-black">{product.thickness}</td>
      //           <td className="border border-black">{product.teeth}</td>
      //           <td className="border border-black">{product.volume}</td> */}
      //         </tr>
      //       ))
      //     )}
      //   </tbody>
      // </table>

        products.map((product) => (
          <AdminProductCard key={product.id} product={product} />
        ))
      )}
      

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
