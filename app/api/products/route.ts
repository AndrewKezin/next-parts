import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { prisma } from '@/prisma/prisma-client';
import intersection from 'lodash/intersection';
import { AddProductDTO, FetchProducts, ProductDTO } from '@/services/dto/cart.dto';
import { ProductItem } from '@prisma/client';
import { checkAdminRules } from '@/lib/check-admin-rules';

export type ItemsType = {
  id: string;
  price: number;
};
export interface FilteredArray {
  items: ItemsType[];
}

// запрос на получение всех товаров для админки
//  поиск по товарам (api/products?query=qweqwe)
// типизация запроса - NextRequest
// Vercel не обрабатывает регистры символов в посковых запросах на кириллице
export async function GET(req: NextRequest) {
  const productName = req.nextUrl.searchParams.get('prodName') || '';
  const prodManufIds = req.nextUrl.searchParams.get('manuf');
  const prodIngredIds = req.nextUrl.searchParams.get('ingred');
  const prodCatIds = req.nextUrl.searchParams.get('cat');
  const productPriceFrom = req.nextUrl.searchParams.get('priceFrom') || '0';
  const productPriceTo = req.nextUrl.searchParams.get('priceTo') || '100000';
  const prodQuantVariants = req.nextUrl.searchParams.get('quantOfTeeth');
  const prodThicknVariants = req.nextUrl.searchParams.get('thickness');
  const prodVolumeVariants = req.nextUrl.searchParams.get('volume');
  const itemsPerPage = req.nextUrl.searchParams.get('itemsPerPage');
  const startIndex = req.nextUrl.searchParams.get('startIndex');

  // переменная modifiedQuery - это попытка обойти косяк Vercel с регистром в поисковых запросах на кириллице
  let modifiedQuery: string;
  productName.length > 1 ? (modifiedQuery = productName.slice(1)) : (modifiedQuery = productName);

  enum SEARCHPRICERANGE {
    FROM = '0',
    TO = '100000',
  }

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Вы не авторизованы' }, { status: 401 });
    }

    if (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER') {
      return NextResponse.json({ message: 'Недостаточно прав' }, { status: 403 });
    }

    if (Number(productPriceFrom) > Number(productPriceTo)) {
      return NextResponse.json({ message: 'Некорректные значения цен' }, { status: 400 });
    }

    // подсчет общего количества товаров в БД
    const totalCount = await prisma.product.count();

    // если все фильры (кроме цен) не заданы, то возвращаем все товары
    if (
      !productName &&
      !prodManufIds &&
      !prodIngredIds &&
      !prodCatIds &&
      !prodQuantVariants &&
      !prodThicknVariants &&
      !prodVolumeVariants
    ) {
      const res = await prisma.product.findMany({
        orderBy: {
          name: 'asc',
        },
        include: {
          items: {
            where: {
              price: {
                gt: Number(productPriceFrom),
                lte: Number(productPriceTo),
              },
            },
          },
          ingredients: true,
          category: true,
          gearboxesManufacturers: true,
        },
        take: Number(itemsPerPage),
        skip: Number(startIndex),
      });

      return NextResponse.json({ products: res, totalCount } as FetchProducts);
    }

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

    // функция фильтрации по стоимости
    const filterProdByPrice = (
      priceFrom: string | SEARCHPRICERANGE.FROM,
      priceTo: string | SEARCHPRICERANGE.TO,
      arr?: FilteredArray[] | null,
      arrItems?: ItemsType[] | null,
    ): string[] => {
      let resArr: string[] | undefined;

      if (arr) {
        resArr = arr
          .map((item) =>
            item.items
              .filter((i) => i.price >= Number(priceFrom) && i.price <= Number(priceTo))
              .map((i) => i.id),
          )
          .flat();
      }

      if (arrItems) {
        resArr = arrItems
          .filter((i) => i.price >= Number(priceFrom) && i.price <= Number(priceTo))
          .map((i) => i.id);
      }

      return resArr ? resArr : [];
    };

    // массивы товаров, отфильтрованные по диапазону цен
    const nameInPriceRange =
      arrByName.length > 0 ? filterProdByPrice(productPriceFrom, productPriceTo, arrByName) : [];
    const manufInPriceRange =
      arrByManuf.length > 0 ? filterProdByPrice(productPriceFrom, productPriceTo, arrByManuf) : [];
    const ingredInPriceRange =
      arrByIngred.length > 0
        ? filterProdByPrice(productPriceFrom, productPriceTo, arrByIngred)
        : [];
    const catInPriceRange =
      arrByCat.length > 0 ? filterProdByPrice(productPriceFrom, productPriceTo, arrByCat) : [];
    const quantInPriceRange =
      arrByQuant.length > 0
        ? filterProdByPrice(productPriceFrom, productPriceTo, null, arrByQuant)
        : [];
    const thicknInPriceRange =
      arrByThickn.length > 0
        ? filterProdByPrice(productPriceFrom, productPriceTo, null, arrByThickn)
        : [];
    const volumeInPriceRange =
      arrByVolume.length > 0
        ? filterProdByPrice(productPriceFrom, productPriceTo, null, arrByVolume)
        : [];

    // функция пересечения фильтров
    const getResultArr = (
      arr1: string[],
      arr2: string[],
      arr3: string[],
      arr4: string[],
      arr5: string[],
      arr6: string[],
      arr7: string[],
    ): string[] => {
      // пропускаем пустые массивы
      const tempArr = [arr1, arr2, arr3, arr4, arr5, arr6, arr7].filter((arr) => arr.length > 0);
      // выполняем пересечение (получаем итоговый массив, в котором есть только элементы, которые есть во всех массивах)
      const resultArr = intersection(...tempArr).sort((a, b) => a.localeCompare(b));
      return resultArr;
    };

    // финальный массив itemId из отфильтрованных товаров
    const resultArr = getResultArr(
      nameInPriceRange,
      manufInPriceRange,
      ingredInPriceRange,
      catInPriceRange,
      quantInPriceRange,
      thicknInPriceRange,
      volumeInPriceRange,
    );

    // получаем отфильтрованный список товаров
    const [products, filteredTotalCount] = await Promise.all([
      prisma.product.findMany({
        where: {
          items: {
            some: {
              id: {
                in: resultArr,
              },
            },
          },
        },
        include: {
          items: {
            where: {
              price: {
                gte: Number(productPriceFrom),
                lte: Number(productPriceTo),
              },
            },
          },
          ingredients: true,
          gearboxesManufacturers: true,
          category: true,
        },
        take: Number(itemsPerPage),
        skip: Number(startIndex),
      }),
      prisma.product.count({
        where: {
          items: {
            some: {
              id: {
                in: resultArr,
              },
            },
          },
        },
      }),
    ]);

    return NextResponse.json({ products, totalCount: filteredTotalCount } as FetchProducts);
  } catch (err) {
    console.log('[GET_PRODUCTS] Error', err);
    return NextResponse.json({ message: '[GET_PRODUCTS] Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      NextResponse.json({ message: 'Вы не авторизованы' }, { status: 401 });
    }

    if (session?.user.role !== 'ADMIN' && session?.user.role !== 'MANAGER') {
      NextResponse.json({ message: 'Недостаточно прав' }, { status: 403 });
    }

    const data: AddProductDTO = await req.json();

    const resProduct = await prisma.product.create({
      data: {
        id: data.id,
        name: data.name,
        imageUrl: data.imageUrl,
        categoryId: data.categoryId,
        gearboxesManufacturers: {
          connect: data.gearboxesManufacturers,
        },
        ingredients: {
          connect: data.ingredients,
        },
      },
    });

    const resProdItems =
      data.items.length > 0 &&
      data.items.map(
        async (item) =>
          await prisma.productItem.create({
            data: {
              id: item.id,
              productId: resProduct.id,
              thickness: item.thickness ? item.thickness : undefined,
              quantityOfTeeth: item.quantityOfTeeth ? item.quantityOfTeeth : undefined,
              volume: item.volume ? item.volume : undefined,
              quantity: item.quantity,
              price: item.price,
            },
          }),
      );

    const res = await prisma.product.findFirst({
      where: {
        id: resProduct.id,
      },
      include: {
        category: true,
        ingredients: true,
        items: true,
        gearboxesManufacturers: true,
      },
    });

    return NextResponse.json(res);
  } catch (err) {
    console.log('[POST_PRODUCT] Error', err);
    return NextResponse.json({ message: '[POST_PRODUCT] Error', err }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const adminRules = await checkAdminRules(true);

    if (adminRules.status !== 200) {
      return NextResponse.json({ message: adminRules.message}, {status: adminRules.status});
    }

    const data: AddProductDTO = await req.json();

    const itemsArr: ProductItem[] = data.items.map((item: ProductItem) => ({
      id: item.id,
      productId: data.id,
      thickness: item.thickness,
      quantityOfTeeth: item.quantityOfTeeth,
      volume: item.volume,
      price: item.price,
      quantity: item.quantity
    }));

   
    
      await prisma.product.upsert({
        where: {
          id: data.id,
        },
        update: {
          name: data.name,
          imageUrl: data.imageUrl,
          categoryId: data.categoryId,
          gearboxesManufacturers: {
            connect: data.gearboxesManufacturers,
          },
          ingredients: {
            connect: data.ingredients,
          },
        },
        create: {
          id: data.id,
          name: data.name,
          imageUrl: data.imageUrl,
          categoryId: data.categoryId,
          gearboxesManufacturers: {
            connect: data.gearboxesManufacturers,
          },
          ingredients: {
            connect: data.ingredients,
          },
        },
      });

      // upsert обновит или создаст запись в БД
      await Promise.all(
        itemsArr.map((item) => (
          prisma.productItem.upsert({
            where: {
              id: item.id,
            },
            update: {
              thickness: item.thickness ? item.thickness : undefined,
              quantityOfTeeth: item.quantityOfTeeth ? item.quantityOfTeeth : undefined,
              volume: item.volume ? item.volume : undefined,
              price: item.price,
              quantity: item.quantity
            },
            create: {
              id: item.id,
              productId: item.productId,
              thickness: item.thickness ? item.thickness : undefined,
              quantityOfTeeth: item.quantityOfTeeth ? item.quantityOfTeeth : undefined,
              volume: item.volume ? item.volume : undefined,
              price: item.price,
              quantity: item.quantity
            },
          })
        ))
      )
    

    return NextResponse.json({message: 'Товар обновлен'}, {status: 200});

    } catch (err) {
      console.log('[PUT_PRODUCT] Error', err);
      return NextResponse.json({message: '[PUT_PRODUCT] Error', err}, {status: 500});
    }
}
