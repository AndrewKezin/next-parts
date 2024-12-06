import { categories, ingredients, products } from "./constants";
import { prisma } from "./prisma-client";
import { hashSync } from 'bcrypt';

// очистка тестовых данных
async function up() {
    // создаем двух тестовых пользователей
    await prisma.user.createMany({
        data: [
            {
                fullName: 'User Test',
                email: 'user@test.test',
                password: hashSync('111111', 10),
                verified: new Date(),
                role: 'USER',
            },
            {
                fullName: 'Admin Admin',
                email: 'admin@test.test',
                password: hashSync('111111', 10),
                verified: new Date(),
                role: 'ADMIN',
            },
        ],
    });

    // создаем тестовые категории
    await prisma.category.createMany({
        data: categories
    });

    // создаем тестовые ингредиенты
    await prisma.ingredient.createMany({
        data: ingredients,
    });

    // создаем тестовые продукты
    await prisma.product.createMany({
        data: products,
    });

    // отдельно создаем товары с ингредиентами
    const disk1 = await prisma.product.create({
        data: {
            name: 'Диск фрикционный',
            imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/05/l98100_1.jpg',
            categoryId: 3,
            ingredients: {
                connect: [{ id: 3 }, { id: 5 }, { id: 6 }],
            }
        }
    });

    const disk2 = await prisma.product.create({
        data: {
            name: 'Диск фрикционный',
            imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/05/l68116c_1.jpg',
            categoryId: 3,
            ingredients: {
                connect: [{ id: 3 }, { id: 5 }, { id: 6 }],
            }
        }
    });

    const disk3 = await prisma.product.create({
        data: {
            name: 'Диск фрикционный',
            imageUrl: 'https://at-cvt.com/wp-content/uploads/2022/01/02/a147108d_1.jpg',
            categoryId: 3,
            ingredients: {
                connect: [{ id: 3 }, { id: 5 }, { id: 6 }],
            }
        }
    });

    const oil1 = await prisma.product.create({
        data: {
            name: 'Масло трансмиссионное Honda CVT HMMF',
            imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/12/19/d704840b_1.jpg',
            categoryId: 7,
            ingredients: {
                connect: [{ id: 1 }, { id: 2 }, { id: 4 }, { id: 5 }, { id: 6 }],
            }
        }
    });

    const oil2 = await prisma.product.create({
        data: {
            name: 'Масло трансмиссионное Mobil ATF 3309',
            imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/10/17/d160840a_1.jpg',
            categoryId: 7,
            ingredients: {
                connect: [{ id: 1 }, { id: 2 }, { id: 4 }, { id: 5 }, { id: 6 }],
            }
        }
    });

    const oil3 = await prisma.product.create({
        data: {
            name: 'Масло трансмиссионное Nissan ATF Matic-S',
            imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/11/21/d322840a_1.jpg',
            categoryId: 7,
            ingredients: {
                connect: [{ id: 1 }, { id: 2 }, { id: 4 }, { id: 5 }, { id: 6 }],
            }
        }
    });

    // создаем вариации для вышеуказанных товаров
    await prisma.productItem.createMany({
        data: [
            {
                productId: disk1.id,
                price: 300,
                thickness: 1.7,
                quantityOfTeeth: 55,
            },
            {
                productId: disk1.id,
                price: 350,
                thickness: 1.5,
                quantityOfTeeth: 60,
            },
            {
                productId: disk2.id,
                price: 520,
                thickness: 1.8,
                quantityOfTeeth: 55,
            },
            {
                productId: disk2.id,
                price: 540,
                thickness: 1.8,
                quantityOfTeeth: 60,
            },
            {
                productId: disk2.id,
                price: 560,
                thickness: 1.7,
                quantityOfTeeth: 55,
            },
            {
                productId: disk2.id,
                price: 580,
                thickness: 1.7,
                quantityOfTeeth: 60,
            },
            {
                productId: disk2.id,
                price: 600,
                thickness: 1.5,
                quantityOfTeeth: 65,
            },
            {
                productId: disk2.id,
                price: 650,
                thickness: 1.9,
                quantityOfTeeth: 65,
            },
            {
                productId: disk3.id,
                price: 370,
                thickness: 1.7,
                quantityOfTeeth: 55,
            },
            {
                productId: oil1.id,
                price: 450,
                volume: 1,
            },
            {
                productId: oil1.id,
                price: 1700,
                volume: 4,
            },
            {
                productId: oil2.id,
                price: 320,
                volume: 1,
            },
            {
                productId: oil2.id,
                price: 1500,
                volume: 5,
            },
            {
                productId: oil3.id,
                price: 600,
                volume: 1,
            },
            {
                productId: oil3.id,
                price: 2400,
                volume: 4,
            },

            // создаем вариации для остальных товаров (чтобы у каждого товара была цена)
            {productId: 1, price: 10300},
            {productId: 2, price: 6500},
            {productId: 3, price: 3300},
            {productId: 4, price: 3200},
            {productId: 5, price: 5300},
            {productId: 6, price: 7500},
            {productId: 7, price: 500},
            {productId: 8, price: 2300},
            {productId: 9, price: 15000},
            {productId: 10, price: 27300},
            {productId: 11, price: 2600},
            {productId: 12, price: 300},
            {productId: 13, price: 23000},
            {productId: 14, price: 27000},
            {productId: 15, price: 33000},
            {productId: 16, price: 15000},
            {productId: 17, price: 7000},
            {productId: 18, price: 10000},
        ],
    });

    // создаем тестовые продукты
    await prisma.cart.createMany({
        data: [
            {
                userId: 1,
                totalAmount: 0,
                token: '11111',
            },
            {
                userId: 2,
                totalAmount: 0,
                token: '22222',
            },
        ],
    });

    // в созданные корзины помещаем тестовые товары
    await prisma.cartItem.create({
        data: {
                productItemId: 3,
                cartId: 1,
                quantity: 2,
                ingredients: {
                    connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 },],
                }
            },
    });
}

// удаление тестовых данных
async function down() {
    // если запустить этот скрипт, то счетчики id не обнулятся
    // await prisma.user.deleteMany({});
    // поэтому пишем sql-запрос на удаление всех записей и связанных с ними данных (CASCADE), тогда счетчики id будут обнуляться
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
}

// заполнение тестовыми данными
async function main() {
    try {
        await down(); 
        await up();
    } catch(err) {
    console.log(err);
    };
}

// вызываем функцию main для генерации тестовых данных (сидов)
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

