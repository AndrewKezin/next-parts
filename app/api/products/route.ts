import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { AddProductDTO, FetchProducts } from '@/services/dto/cart.dto';
import { ProductItem } from '@prisma/client';
import { checkAdminRules } from '@/lib/check-admin-rules';
import { SEARCHPRICERANGE } from '@/@types/products';
import { getFilteredArr } from '@/lib';

// запрос на получение всех товаров для админки
//  поиск по товарам (api/products?query=qweqwe)
// типизация запроса - NextRequest
// Vercel не обрабатывает регистры символов в посковых запросах на кириллице
export async function GET(req: NextRequest) {
  try {
    const adminRules = await checkAdminRules(true);

    if (adminRules.status !== 200) {
      return NextResponse.json({ message: adminRules.message }, { status: adminRules.status });
    }

    // вытащить значения параметров из адресной строки. Если нет параметра, то вернет пустую строку
    const productName = req.nextUrl.searchParams.get('prodName') || '';
    const prodManufIds = req.nextUrl.searchParams.get('manuf') || '';
    const prodIngredIds = req.nextUrl.searchParams.get('ingred') || '';
    const prodCatIds = req.nextUrl.searchParams.get('cat') || '';
    const productPriceFrom = req.nextUrl.searchParams.get('priceFrom') || SEARCHPRICERANGE.FROM;
    const productPriceTo = req.nextUrl.searchParams.get('priceTo') || SEARCHPRICERANGE.TO;
    const prodQuantVariants = req.nextUrl.searchParams.get('quantOfTeeth') || '';
    const prodThicknVariants = req.nextUrl.searchParams.get('thickness') || '';
    const prodVolumeVariants = req.nextUrl.searchParams.get('volume') || '';
    const itemsPerPage = req.nextUrl.searchParams.get('itemsPerPage');
    const startIndex = req.nextUrl.searchParams.get('startIndex');

    // переменная modifiedQuery - это попытка обойти косяк Vercel с регистром в поисковых запросах на кириллице
    let modifiedQuery: string;
    productName.length > 1 ? (modifiedQuery = productName.slice(1)) : (modifiedQuery = productName);

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

    // получаем отфильтрованный список id товаров
    const resultArr = await getFilteredArr(
      productName,
      prodManufIds,
      prodIngredIds,
      prodCatIds,
      productPriceFrom,
      productPriceTo,
      prodQuantVariants,
      prodThicknVariants,
      prodVolumeVariants,
      modifiedQuery,
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

// Добавление товара (не используется, потому что ниже прописана логика для PUT запроса)
export async function POST(req: NextRequest) {
  try {
    const adminRules = await checkAdminRules(true);

    if (adminRules.status !== 200) {
      return NextResponse.json({ message: adminRules.message }, { status: adminRules.status });
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

// Обновление товара или добавление товара, если его нет в БД
export async function PUT(req: NextRequest) {
  try {
    const adminRules = await checkAdminRules(true);

    if (adminRules.status !== 200) {
      return NextResponse.json({ message: adminRules.message }, { status: adminRules.status });
    }

    const data: AddProductDTO = await req.json();

    const itemsArr: ProductItem[] = data.items.map((item: ProductItem) => ({
      id: item.id,
      productId: data.id,
      thickness: item.thickness,
      quantityOfTeeth: item.quantityOfTeeth,
      volume: item.volume,
      price: item.price,
      quantity: item.quantity,
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
      itemsArr.map((item) =>
        prisma.productItem.upsert({
          where: {
            id: item.id,
          },
          update: {
            thickness: item.thickness ? item.thickness : undefined,
            quantityOfTeeth: item.quantityOfTeeth ? item.quantityOfTeeth : undefined,
            volume: item.volume ? item.volume : undefined,
            price: item.price,
            quantity: item.quantity,
          },
          create: {
            id: item.id,
            productId: item.productId,
            thickness: item.thickness ? item.thickness : undefined,
            quantityOfTeeth: item.quantityOfTeeth ? item.quantityOfTeeth : undefined,
            volume: item.volume ? item.volume : undefined,
            price: item.price,
            quantity: item.quantity,
          },
        }),
      ),
    );

    return NextResponse.json({ message: 'Товар обновлен' }, { status: 200 });
  } catch (err) {
    console.log('[PUT_PRODUCT] Error', err);
    return NextResponse.json({ message: '[PUT_PRODUCT] Error', err }, { status: 500 });
  }
}
