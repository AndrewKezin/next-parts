import { FilteredArray, ItemsType } from '@/@types/products';
import { prisma } from '@/prisma/prisma-client';

/**
 * Функция получает списки из запроса (из searchParams) и возвращает списки товаров, удовлетворяющих условиям
 * @param productName 
 * @param prodManufIds 
 * @param prodIngredIds 
 * @param prodCatIds 
 * @param prodQuantVariants 
 * @param prodThicknVariants 
 * @param prodVolumeVariants 
 * @param modifiedQuery 
 * @returns 
 */
export const searchProdByParams = async (
  productName: string,
  prodManufIds: string,
  prodIngredIds: string,
  prodCatIds: string,
  prodQuantVariants: string,
  prodThicknVariants: string,
  prodVolumeVariants: string,
  modifiedQuery: string,
) => {
  // поиск по названию
  const arrByName: FilteredArray[] = productName
    ? [
        ...(await prisma.product.findMany({
          orderBy: {
            name: 'asc',
          },
          where: {
            name: {
              contains: modifiedQuery,
              mode: 'insensitive',
            },
          },
          select: {
            items: {
              select: {
                id: true,
                price: true,
              },
            },
          },
        })),
      ]
    : [];

  // поиск по производителям
  const arrByManuf: FilteredArray[] = prodManufIds
    ? [
        ...(await prisma.product.findMany({
          orderBy: {
            name: 'asc',
          },
          where: {
            gearboxesManufacturers: {
              some: {
                id: {
                  in: prodManufIds.split(',').map(Number),
                },
              },
            },
          },
          select: {
            items: {
              select: {
                id: true,
                price: true,
              },
            },
          },
        })),
      ]
    : [];

  // поиск по ингредиентам
  const arrByIngred: FilteredArray[] = prodIngredIds
    ? [
        ...(await prisma.product.findMany({
          orderBy: {
            name: 'asc',
          },
          where: {
            ingredients: {
              some: {
                id: {
                  in: prodIngredIds.split(','),
                },
              },
            },
          },
          select: {
            items: {
              select: {
                id: true,
                price: true,
              },
            },
          },
        })),
      ]
    : [];

  // поиск по категориям
  const arrByCat: FilteredArray[] = prodCatIds
    ? [
        ...(await prisma.product.findMany({
          orderBy: {
            name: 'asc',
          },
          where: {
            category: {
              id: {
                in: prodCatIds.split(',').map(Number),
              },
            },
          },
          select: {
            items: {
              select: {
                id: true,
                price: true,
              },
            },
          },
        })),
      ]
    : [];

  // поиск по количеству зубов диска
  const arrByQuant: ItemsType[] = prodQuantVariants
    ? [
        ...(await prisma.productItem.findMany({
          where: {
            quantityOfTeeth: {
              in: prodQuantVariants.split(',').map(Number),
            },
          },
          select: {
            id: true,
            price: true,
          },
        })),
      ]
    : [];

  // поиск по толщине диска
  const arrByThickn: ItemsType[] = prodThicknVariants
    ? [
        ...(await prisma.productItem.findMany({
          where: {
            thickness: {
              in: prodThicknVariants.split(',').map(Number),
            },
          },
          select: {
            id: true,
            price: true,
          },
        })),
      ]
    : [];

  // поиск по объему канистры масла
  const arrByVolume: ItemsType[] = prodVolumeVariants
    ? [
        ...(await prisma.productItem.findMany({
          where: {
            volume: {
              in: prodVolumeVariants.split(',').map(Number),
            },
          },
          select: {
            id: true,
            price: true,
          },
        })),
      ]
    : [];

  return { arrByName, arrByManuf, arrByIngred, arrByCat, arrByQuant, arrByThickn, arrByVolume };
};
