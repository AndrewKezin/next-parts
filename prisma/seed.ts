import { categories, gearboxManufacturers, ingredients, products } from './constants';
import { prisma } from './prisma-client';
import { hashSync } from 'bcrypt';

// очистка тестовых данных
async function up() {
  // Важно наполнять базы данных в правильной очередности. Иначе может получиться так, что наполняемая база может запрашивать еще несуществующие данные (из базы, которая еще не заполнена)

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
    data: categories,
  });

  // создаем тестовые ингредиенты
  await prisma.ingredient.createMany({
    data: ingredients,
  });

  // создаем производителей коробок передач
  await prisma.gearboxManufacturer.createMany({
    data: gearboxManufacturers,
  });

  // создаем тестовые продукты (через createMany не получится связать продукты с ингредиентами и производителями коробок передач)
  //   await prisma.product.createMany({
  //     data: products,
  //   });

  // создаем тестовыепродукты отдельно, чтобы через connect связать их с ингредиентами и производителями коробок передач
  const d194002a = await prisma.product.create({
    data: {
      name: 'Комплект прокладок и сальников (BMW)',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2022/06/05/d194002a_1.jpg',
      categoryId: 1,
      gearboxesManufacturers: { connect: [{ id: 14 }] },
    },
  });

  const p156002a = await prisma.product.create({
    data: {
      name: 'Комплект прокладок и сальников (Gen 1/2, 2003-up, с шайбами)',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2023/11/19/P156002A_1.jpg',
      categoryId: 1,
      gearboxesManufacturers: { connect: [{ id: 6 }] },
    },
  });

  const d458004a = await prisma.product.create({
    data: {
      name: 'Ремкомплект с фрикционными дисками',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/11/21/d458004a_1.jpg',
      categoryId: 1,
      gearboxesManufacturers: { connect: [{ id: 11 }] },
    },
  });

  const s745002a = await prisma.product.create({
    data: {
      name: 'Комплект прокладок и сальников',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/11/21/s745002a_1.jpg',
      categoryId: 1,
      gearboxesManufacturers: { connect: [{ id: 7 }] },
    },
  });

  const a745012c = await prisma.product.create({
    data: {
      name: 'Фильтр картридж (с пластиковым корпусом и крышкой)',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2023/05/28/A745012C_1.jpg',
      categoryId: 2,
      gearboxesManufacturers: { connect: [{ id: 1 }] },
    },
  });

  const d251010a = await prisma.product.create({
    data: {
      name: 'Поддон пластиковый с встроенным фильтром и прокладкой',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2023/06/11/D251010A_1.jpg',
      categoryId: 2,
      gearboxesManufacturers: { connect: [{ id: 12 }] },
    },
  });

  const a765010a = await prisma.product.create({
    data: {
      name: 'Поддон пластиковый с встроенным фильтром и прокладкой ',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/04/a765010a_1.jpg',
      categoryId: 2,
      gearboxesManufacturers: { connect: [{ id: 10 }] },
    },
  });

  const d96671 = await prisma.product.create({
    data: {
      name: 'Вал масляного насоса',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/04/15/d96671_1.jpg',
      categoryId: 4,
      gearboxesManufacturers: { connect: [{ id: 16 }] },
    },
  });

  const a39679b = await prisma.product.create({
    data: {
      name: 'Вал промежуточный раздаточной коробки',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2022/01/30/a39679b_1.jpg',
      categoryId: 4,
      gearboxesManufacturers: { connect: [{ id: 8 }] },
    },
  });

  const a757420a = await prisma.product.create({
    data: {
      name: 'Комплект соленоидов (9шт.)',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/04/15/a757420a_1.jpg',
      categoryId: 5,
      gearboxesManufacturers: { connect: [{ id: 5 }] },
    },
  });

  const d46420 = await prisma.product.create({
    data: {
      name: 'Блок соленоидов (#0260200001)',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/04/d46420_1.jpg',
      categoryId: 5,
      gearboxesManufacturers: { connect: [{ id: 13 }] },
    },
  });

  const d663410a = await prisma.product.create({
    data: {
      name: 'Датчик переключения передач (Nissan, тип 1)',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2024/04/07/D663410A_1.jpg',
      categoryId: 5,
      gearboxesManufacturers: { connect: [{ id: 9 }] },
    },
  });

  const f030 = await prisma.product.create({
    data: {
      name: 'Гидравлический блок управления (99-up, без блока соленоидов, восстановленный)',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/05/f030_1.jpg',
      categoryId: 6,
      gearboxesManufacturers: { connect: [{ id: 15 }] },
    },
  });

  const d19740a = await prisma.product.create({
    data: {
      name: 'Гидравлический блок управления (тип 1, Opel)',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/09/26/d19740a_1.jpg',
      categoryId: 6,
      gearboxesManufacturers: { connect: [{ id: 2 }] },
    },
  });

  const d665740a = await prisma.product.create({
    data: {
      name: 'Гидравлический блок управления (Nissan, тип 1)',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/05/13/d666740a_1.jpg',
      categoryId: 6,
      gearboxesManufacturers: { connect: [{ id: 3 }] },
    },
  });

  const m465fk = await prisma.product.create({
    data: {
      name: 'Комплект адаптеров для очистки системы охлаждения',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/05/m465fk_1.jpg',
      categoryId: 8,
      gearboxesManufacturers: { connect: [{ id: 15 }] },
    },
  });

  const t55064 = await prisma.product.create({
    data: {
      name: 'Набор инструментов для установки втулок',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/05/t-55064_1.jpg',
      categoryId: 8,
      gearboxesManufacturers: { connect: [{ id: 4 }] },
    },
  });

  const jtc4921 = await prisma.product.create({
    data: {
      name: 'Съемник гидравлического блока управления',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/05/11/jtc-4921_1.jpg',
      categoryId: 8,
      gearboxesManufacturers: { connect: [{ id: 2 }] },
    },
  });

  // отдельно создаем товары с ингредиентами
  const disk1 = await prisma.product.create({
    data: {
      name: 'Диск фрикционный',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/05/l98100_1.jpg',
      categoryId: 3,
      ingredients: {
        connect: [{ id: 3 }, { id: 5 }, { id: 6 }],
      },
      gearboxesManufacturers: {
        connect: [{ id: 1 }],
      },
    },
  });

  const disk2 = await prisma.product.create({
    data: {
      name: 'Диск фрикционный',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/05/l68116c_1.jpg',
      categoryId: 3,
      ingredients: {
        connect: [{ id: 3 }, { id: 5 }, { id: 6 }],
      },
      gearboxesManufacturers: {
        connect: [{ id: 2 }],
      },
    },
  });

  const disk3 = await prisma.product.create({
    data: {
      name: 'Диск фрикционный',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2022/01/02/a147108d_1.jpg',
      categoryId: 3,
      ingredients: {
        connect: [{ id: 3 }, { id: 5 }, { id: 6 }],
      },
      gearboxesManufacturers: {
        connect: [{ id: 3 }],
      },
    },
  });

  const oil1 = await prisma.product.create({
    data: {
      name: 'Масло трансмиссионное Honda CVT HMMF',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/12/19/d704840b_1.jpg',
      categoryId: 7,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 4 }, { id: 5 }, { id: 6 }],
      },
      gearboxesManufacturers: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });

  const oil2 = await prisma.product.create({
    data: {
      name: 'Масло трансмиссионное Mobil ATF 3309',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/10/17/d160840a_1.jpg',
      categoryId: 7,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 4 }, { id: 5 }, { id: 6 }],
      },
      gearboxesManufacturers: {
        connect: [{ id: 3 }, { id: 4 }, { id: 5 }],
      },
    },
  });

  const oil3 = await prisma.product.create({
    data: {
      name: 'Масло трансмиссионное Nissan ATF Matic-S',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/11/21/d322840a_1.jpg',
      categoryId: 7,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 4 }, { id: 5 }, { id: 6 }],
      },
      gearboxesManufacturers: {
        connect: [{ id: 3 }, { id: 4 }, { id: 5 }],
      },
    },
  });

  // создаем вариации для вышеуказанных товаров
  await prisma.productItem.createMany({
    data: [
      {
        productId: disk1.id,
        quantity: 3,
        price: 300,
        thickness: 1.7,
        quantityOfTeeth: 55,
      },
      {
        productId: disk1.id,
        quantity: 9,
        price: 350,
        thickness: 1.5,
        quantityOfTeeth: 60,
      },
      {
        productId: disk2.id,
        quantity: 10,
        price: 520,
        thickness: 1.8,
        quantityOfTeeth: 55,
      },
      {
        productId: disk2.id,
        quantity: 7,
        price: 540,
        thickness: 1.8,
        quantityOfTeeth: 60,
      },
      {
        productId: disk2.id,
        quantity: 10,
        price: 560,
        thickness: 1.7,
        quantityOfTeeth: 55,
      },
      {
        productId: disk2.id,
        quantity: 3,
        price: 580,
        thickness: 1.7,
        quantityOfTeeth: 60,
      },
      {
        productId: disk2.id,
        quantity: 8,
        price: 600,
        thickness: 1.5,
        quantityOfTeeth: 65,
      },
      {
        productId: disk2.id,
        quantity: 5,
        price: 650,
        thickness: 1.9,
        quantityOfTeeth: 65,
      },
      {
        productId: disk3.id,
        quantity: 10,
        price: 370,
        thickness: 1.7,
        quantityOfTeeth: 55,
      },
      {
        productId: oil1.id,
        quantity: 10,
        price: 450,
        volume: 1,
      },
      {
        productId: oil1.id,
        quantity: 10,
        price: 1700,
        volume: 4,
      },
      {
        productId: oil2.id,
        quantity: 2,
        price: 320,
        volume: 1,
      },
      {
        productId: oil2.id,
        quantity: 1,
        price: 1500,
        volume: 5,
      },
      {
        productId: oil3.id,
        quantity: 5,
        price: 600,
        volume: 1,
      },
      {
        productId: oil3.id,
        quantity: 3,
        price: 2400,
        volume: 4,
      },

      // создаем вариации для остальных товаров (чтобы у каждого товара была цена)
      { productId: 1, price: 10300, quantity: 1 },
      { productId: 2, price: 6500, quantity: 2 },
      { productId: 3, price: 3300, quantity: 3 },
      { productId: 4, price: 3200, quantity: 4 },
      { productId: 5, price: 5300, quantity: 5 },
      { productId: 6, price: 7500, quantity: 6 },
      { productId: 7, price: 500, quantity: 7 },
      { productId: 8, price: 2300, quantity: 8 },
      { productId: 9, price: 15000, quantity: 9 },
      { productId: 10, price: 27300, quantity: 10 },
      { productId: 11, price: 2600, quantity: 8 },
      { productId: 12, price: 300, quantity: 2 },
      { productId: 13, price: 23000, quantity: 7 },
      { productId: 14, price: 27000, quantity: 4 },
      { productId: 15, price: 33000, quantity: 6 },
      { productId: 16, price: 15000, quantity: 9 },
      { productId: 17, price: 7000, quantity: 1 },
      { productId: 18, price: 10000, quantity: 5 },
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
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      },
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
  await prisma.$executeRaw`TRUNCATE TABLE "GearboxManufacturer" RESTART IDENTITY CASCADE`;
}

// заполнение тестовыми данными
async function main() {
  try {
    await down();
    await up();
  } catch (err) {
    console.log(err);
  }
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
