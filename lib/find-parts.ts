import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
    query?: string;
    sortBy?: string;
    thickness?: string;
    quantityOfTeeth?: string;
    volume?: string;
    ingredients?: string;
    priceFrom?: string;
    priceTo?: string;
}

// Параметры по умолчанию
const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 100000;

/**
 * Функция для получения товаров по фильтрации (из searchParams в url)
 */
export const findParts = async (params: GetSearchParams) => {
    const thickness = params.thickness?.split(',').map(Number);
    const quantityOfTeeth = params.quantityOfTeeth?.split(',').map(Number);
    const volume = params.volume?.split(',').map(Number);
    const ingredientsIdArr = params.ingredients?.split(',').map(Number);

    const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
    const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

    const categories = await prisma.category.findMany({
        include: {
            products:{
                orderBy: {
                    id: 'desc',
                },
                where: {
                    // поиск по ингедиентам
                    ingredients: ingredientsIdArr
                    ? {
                        some: {
                            id: {
                                in: ingredientsIdArr,
                            },
                        },
                      }
                    : undefined,
                    // поиск по толщине и количеству зубьев диска и объему канистры масла, по цене
                    items: {
                        some: {
                            thickness: {
                                in: thickness,
                            },
                            quantityOfTeeth: {
                                in: quantityOfTeeth,
                            },
                            volume: {
                                in: volume,
                            },
                            price: {
                                // gte - greater than or equal, lte - less than or equal
                                gte: minPrice,
                                lte: maxPrice,
                            }
                        },
                    },
                },
                include: {
                    ingredients: true,
                    // для правильной выборки здесь важна комбинация where и orderBy. Источник https://youtu.be/GUwizGbY4cc?t=51745 Здесь без условия where, если хотя бы один items не соответсвует условию цены, но не вернется ни один товар. Если добавить это условие, то вернется товар, в котором хотя бы один items соответсвует условию цены и в нем будут содержаться те items, которые соответсвуют условию цены.
                    items: {
                        // где цена больше или равна minPrice, но меньше или равна maxPrice
                        where: {
                            price: {
                                gte: minPrice,
                                lte: maxPrice,
                            },
                        },
                        // сортировка по цене по возрастанию
                        orderBy: {
                            price: 'asc'
                        }
                    },
                    gearboxesManufacturers: true,
                },
            },
        },
    });

    return categories;
}
