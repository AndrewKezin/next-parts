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
        status: 'ACTIVE',
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
        updatedAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
      },
      {
        fullName: 'Admin Admin',
        email: 'admin@test.test',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'ADMIN',
        status: 'ACTIVE',
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
        updatedAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
      },
      {
        fullName: 'Manager Manager',
        email: 'manager@test.test',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'MANAGER',
        status: 'ACTIVE',
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
        updatedAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
      },
      {
        fullName: 'Ivan Ivanov',
        email: 'ivanivanov@test.test',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
        status: 'ACTIVE',
        address: '123 Main St',
        phone: '1234567890',
      },
      {
        fullName: 'Petr Petrov',
        email: 'petrpetrov@test.test',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
        status: 'INACTIVE',
      },
      {
        fullName: 'Sergey Sergeev',
        email: 'sergeysergeev@test.test',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
        status: 'INDEBTED',
        phone: '0987654321',
      },
      {
        fullName: 'Olga Ivanova',
        email: 'olgaivanova@test.test',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
        status: 'BANNED',
        address: '456 Elm St',
      },
      {
        fullName: 'Alexandr Petrov',
        email: 'alexandrpertov@test.test',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
        status: 'DELETED',
      },
      {
        fullName: 'Nikolay Nikolaev',
        email: 'nikolaynikolaev@test.test',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
        status: 'ACTIVE',
        address: '789 Pine St',
      },
      {
        fullName: 'Ekaterina Ekaterinova',
        email: 'ekaterinaekaterinova@test.test',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
        status: 'INACTIVE',
        phone: '1122334455',
      },
      {
        fullName: 'Andrey Andreev',
        email: 'andreyandreev@test.test',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
        status: 'INDEBTED',
      },
      {
        fullName: 'Vladimir Vladimirov',
        email: 'vladimirvladimirov@test.test',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
        status: 'BANNED',
        address: '321 Oak St',
      },
      {
        fullName: 'Evgeniy Evgeniev',
        email: 'evgenievegeniev@test.test',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
        status: 'DELETED',
      },
      {
        fullName: 'Anna Andreeva',
        email: 'annaandreeva@test.test',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
        status: 'ACTIVE',
        phone: '5566778899',
      },
      {
        fullName: 'Igor Igorev',
        email: 'igorigorev@test.test',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
        status: 'INACTIVE',
        address: '654 Spruce St',
      },
      {
        fullName: 'Natalia Nikolaeva',
        email: 'natalianikolaeva@test.test',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
        status: 'INDEBTED',
      },
      {
        fullName: 'Evgenia Evgenieva',
        email: 'evgeniaevgenieva@test.test',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
        status: 'BANNED',
        phone: '6677889900',
      },
      {
        fullName: 'Dmitriy Dmitriev',
        email: 'dmitriydmitriev@test.test',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
        status: 'DELETED',
      },
      {
        fullName: 'Marina Marinova',
        email: 'marinamarinova@test.test',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
        status: 'ACTIVE',
        address: '987 Birch St',
      },
      {
        fullName: 'Aleksandr Petrov',
        email: 'aleksandrpertov@test.test',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
        status: 'INACTIVE',
      },
      {
        fullName: 'Olga Ivanova',
        email: 'olgaivanova@test.test',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
        status: 'INDEBTED',
        phone: '7788990011',
      },
      {
        fullName: 'Petr Petrov',
        email: 'petrpetrov@test.test',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
        status: 'BANNED',
      },
      {
        fullName: 'Sergey Sergeev',
        email: 'sergeysergeev@test.test',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
        status: 'DELETED',
        address: '159 Cedar St',
      },
      {
        fullName: 'Nikolay Nikolaev',
        email: 'nikolaynikolaev@test.test',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
        status: 'ACTIVE',
      },
      {
        fullName: 'Ekaterina Ekaterinova',
        email: 'ekaterinaekaterinova@test.test',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
        status: 'INACTIVE',
      },
      {
        fullName: 'Andrey Andreev',
        email: 'andreyandreev@test.test',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
        status: 'INDEBTED',
        phone: '8899001122',
      },
      {
        fullName: 'Vladimir Vladimirov',
        email: 'vladimirvladimirov@test.test',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
        status: 'BANNED',
      },
      {
        fullName: 'Evgeniy Evgeniev',
        email: 'evgenievegeniev@test.test',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
        status: 'DELETED',
        address: '753 Maple St',
      },
      {
        fullName: 'Ivan Ivanov',
        email: 'ivanivanov@test.test',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
        status: 'ACTIVE',
      },
      {
        fullName: 'Petr Petrov',
        email: 'petrpetrov2@test.test',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
        status: 'INACTIVE',
      },
      {
        fullName: 'Sergey Sergeev',
        email: 'sergeysergeev2@test.test',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
        status: 'INDEBTED',
      },
      {
        fullName: 'Olga Ivanova',
        email: 'olgaivanova2@test.test',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
        status: 'BANNED',
      },
      {
        fullName: 'Aleksandr Petrov',
        email: 'aleksandrpertov2@test.test',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
        status: 'DELETED',
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

  // создаем тестовые продукты отдельно, чтобы через connect связать их с ингредиентами и производителями коробок передач
  const d194002a = await prisma.product.create({
    data: {
      id: 'd19402a',
      name: 'Комплект прокладок и сальников (BMW)',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2022/06/05/d194002a_1.jpg',
      categoryId: 1,
      gearboxesManufacturers: { connect: [{ id: 14 }] },
      ingredients: { connect: [{ id: 'pack002' }] },
    },
  });

  const p156002a = await prisma.product.create({
    data: {
      id: 'p156002',
      name: 'Комплект прокладок и сальников (Gen 1/2, 2003-up, с шайбами)',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2023/11/19/P156002A_1.jpg',
      categoryId: 1,
      gearboxesManufacturers: { connect: [{ id: 6 }] },
      ingredients: { connect: [{ id: 'pack002' }] },
    },
  });

  const d458004a = await prisma.product.create({
    data: {
      id: 'd458004',
      name: 'Ремкомплект с фрикционными дисками',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/11/21/d458004a_1.jpg',
      categoryId: 1,
      gearboxesManufacturers: { connect: [{ id: 11 }] },
      ingredients: { connect: [{ id: 'pack002' }] },
    },
  });

  const s745002a = await prisma.product.create({
    data: {
      id: 's745002',
      name: 'Комплект прокладок и сальников',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/11/21/s745002a_1.jpg',
      categoryId: 1,
      gearboxesManufacturers: { connect: [{ id: 7 }] },
      ingredients: { connect: [{ id: 'pack002' }] },
    },
  });

  const a745012c = await prisma.product.create({
    data: {
      id: 'a745012',
      name: 'Фильтр картридж (с пластиковым корпусом и крышкой)',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2023/05/28/A745012C_1.jpg',
      categoryId: 2,
      gearboxesManufacturers: { connect: [{ id: 1 }] },
      ingredients: { connect: [{ id: 'pack001' }] },
    },
  });

  const d251010a = await prisma.product.create({
    data: {
      id: 'd251010',
      name: 'Поддон пластиковый с встроенным фильтром и прокладкой',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2023/06/11/D251010A_1.jpg',
      categoryId: 2,
      gearboxesManufacturers: { connect: [{ id: 12 }] },
      ingredients: { connect: [{ id: 'pack002' }] },
    },
  });

  const a765010a = await prisma.product.create({
    data: {
      id: 'a765010',
      name: 'Поддон пластиковый с встроенным фильтром и прокладкой ',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/04/a765010a_1.jpg',
      categoryId: 2,
      gearboxesManufacturers: { connect: [{ id: 10 }] },
      ingredients: { connect: [{ id: 'pack002' }] },
    },
  });

  const d96671 = await prisma.product.create({
    data: {
      id: 'd96671',
      name: 'Вал масляного насоса',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/04/15/d96671_1.jpg',
      categoryId: 4,
      gearboxesManufacturers: { connect: [{ id: 16 }] },
    },
  });

  const a39679b = await prisma.product.create({
    data: {
      id: 'a39679b',
      name: 'Вал промежуточный раздаточной коробки',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2022/01/30/a39679b_1.jpg',
      categoryId: 4,
      gearboxesManufacturers: { connect: [{ id: 8 }] },
    },
  });

  const a757420a = await prisma.product.create({
    data: {
      id: 'a757420',
      name: 'Комплект соленоидов (9шт.)',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/04/15/a757420a_1.jpg',
      categoryId: 5,
      gearboxesManufacturers: { connect: [{ id: 5 }] },
      ingredients: { connect: [{ id: 'pack001' }] },
    },
  });

  const d46420 = await prisma.product.create({
    data: {
      id: 'd46420',
      name: 'Блок соленоидов (#0260200001)',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/04/d46420_1.jpg',
      categoryId: 5,
      gearboxesManufacturers: { connect: [{ id: 13 }] },
      ingredients: { connect: [{ id: 'calib001' }, { id: 'flash001' }, { id: 'pack001' }] },
    },
  });

  const d663410a = await prisma.product.create({
    data: {
      id: 'd663410',
      name: 'Датчик переключения передач (Nissan, тип 1)',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2024/04/07/D663410A_1.jpg',
      categoryId: 5,
      gearboxesManufacturers: { connect: [{ id: 9 }] },
      ingredients: { connect: [{ id: 'pack001' }] },
    },
  });

  const f030 = await prisma.product.create({
    data: {
      id: 'f030',
      name: 'Гидравлический блок управления (99-up, без блока соленоидов, восстановленный)',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/05/f030_1.jpg',
      categoryId: 6,
      gearboxesManufacturers: { connect: [{ id: 15 }] },
      ingredients: { connect: [{ id: 'calib001' }, { id: 'flash001' }, { id: 'pack002' }] },
    },
  });

  const d19740a = await prisma.product.create({
    data: {
      id: 'd19740a',
      name: 'Гидравлический блок управления (тип 1, Opel)',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/09/26/d19740a_1.jpg',
      categoryId: 6,
      gearboxesManufacturers: { connect: [{ id: 2 }] },
      ingredients: { connect: [{ id: 'calib001' }, { id: 'flash001' }, { id: 'pack002' }] },
    },
  });

  const d665740a = await prisma.product.create({
    data: {
      id: 'd665740',
      name: 'Гидравлический блок управления (Nissan, тип 1)',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/05/13/d666740a_1.jpg',
      categoryId: 6,
      gearboxesManufacturers: { connect: [{ id: 3 }] },
      ingredients: { connect: [{ id: 'calib001' }, { id: 'flash001' }, { id: 'pack002' }] },
    },
  });

  const m465fk = await prisma.product.create({
    data: {
      id: 'm465fk',
      name: 'Комплект адаптеров для очистки системы охлаждения',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/05/m465fk_1.jpg',
      categoryId: 8,
      gearboxesManufacturers: { connect: [{ id: 15 }] },
    },
  });

  const t55064 = await prisma.product.create({
    data: {
      id: 't55064',
      name: 'Набор инструментов для установки втулок',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/05/t-55064_1.jpg',
      categoryId: 8,
      gearboxesManufacturers: { connect: [{ id: 4 }] },
    },
  });

  const jtc4921 = await prisma.product.create({
    data: {
      id: 'jtc4921',
      name: 'Съемник гидравлического блока управления',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/05/11/jtc-4921_1.jpg',
      categoryId: 8,
      gearboxesManufacturers: { connect: [{ id: 2 }] },
    },
  });

  // отдельно создаем товары с ингредиентами
  const disk1 = await prisma.product.create({
    data: {
      id: 'a4g1e2c',
      name: 'Диск фрикционный',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/05/l98100_1.jpg',
      categoryId: 3,
      ingredients: { connect: [{ id: 'pack001' }] },
      gearboxesManufacturers: {
        connect: [{ id: 1 }],
      },
    },
  });

  const disk2 = await prisma.product.create({
    data: {
      id: 'q2w3e4r',
      name: 'Диск фрикционный',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/05/l68116c_1.jpg',
      categoryId: 3,
      ingredients: { connect: [{ id: 'pack001' }] },
      gearboxesManufacturers: {
        connect: [{ id: 2 }],
      },
    },
  });

  const disk3 = await prisma.product.create({
    data: {
      id: 'y5u6i7o',
      name: 'Диск фрикционный',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2022/01/02/a147108d_1.jpg',
      categoryId: 3,
      ingredients: { connect: [{ id: 'pack001' }] },
      gearboxesManufacturers: {
        connect: [{ id: 3 }],
      },
    },
  });

  const oil1 = await prisma.product.create({
    data: {
      id: 't4r3e2w',
      name: 'Масло трансмиссионное Honda CVT HMMF',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/12/19/d704840b_1.jpg',
      categoryId: 7,
      gearboxesManufacturers: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
      ingredients: { connect: [{ id: 'oilutil005' }, { id: 'oilutil010' }, { id: 'oilutil020' }] },
    },
  });

  const oil2 = await prisma.product.create({
    data: {
      id: 'z5x4c3v',
      name: 'Масло трансмиссионное Mobil ATF 3309',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/10/17/d160840a_1.jpg',
      categoryId: 7,
      gearboxesManufacturers: {
        connect: [{ id: 3 }, { id: 4 }, { id: 5 }],
      },
      ingredients: { connect: [{ id: 'oilutil005' }, { id: 'oilutil010' }, { id: 'oilutil020' }] },
    },
  });

  const oil3 = await prisma.product.create({
    data: {
      id: 'x3c2v1b',
      name: 'Масло трансмиссионное Nissan ATF Matic-S',
      imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/11/21/d322840a_1.jpg',
      categoryId: 7,
      gearboxesManufacturers: {
        connect: [{ id: 3 }, { id: 4 }, { id: 5 }],
      },
      ingredients: { connect: [{ id: 'oilutil005' }, { id: 'oilutil010' }, { id: 'oilutil020' }] },
    },
  });

  // создаем вариации для вышеуказанных товаров
  await prisma.productItem.createMany({
    data: [
      {
        id: 'a1b2c3d123',
        productId: disk1.id,
        quantity: 3,
        price: 300,
        thickness: 1.7,
        quantityOfTeeth: 55,
      },
      {
        id: 'e4f5g6h123',
        productId: disk1.id,
        quantity: 9,
        price: 350,
        thickness: 1.5,
        quantityOfTeeth: 60,
      },
      {
        id: 'i7j8k9l',
        productId: disk2.id,
        quantity: 10,
        price: 520,
        thickness: 1.8,
        quantityOfTeeth: 55,
      },
      {
        id: 'm1n2o3p',
        productId: disk2.id,
        quantity: 7,
        price: 540,
        thickness: 1.8,
        quantityOfTeeth: 60,
      },
      {
        id: 'q4r5s6t',
        productId: disk2.id,
        quantity: 10,
        price: 560,
        thickness: 1.7,
        quantityOfTeeth: 55,
      },
      {
        id: 'u8v9w0x123',
        productId: disk2.id,
        quantity: 3,
        price: 580,
        thickness: 1.7,
        quantityOfTeeth: 60,
      },
      {
        id: 'y1z2a3b123',
        productId: disk2.id,
        quantity: 8,
        price: 600,
        thickness: 1.5,
        quantityOfTeeth: 65,
      },
      {
        id: 'c4d5e6f123',
        productId: disk2.id,
        quantity: 5,
        price: 650,
        thickness: 1.9,
        quantityOfTeeth: 65,
      },
      {
        id: 'g7h8i9j123',
        productId: disk3.id,
        quantity: 10,
        price: 370,
        thickness: 1.7,
        quantityOfTeeth: 55,
      },
      {
        id: 'k1l2m3n123',
        productId: oil1.id,
        quantity: 10,
        price: 450,
        volume: 1,
      },
      {
        id: 'o4p5q6r123',
        productId: oil1.id,
        quantity: 10,
        price: 1700,
        volume: 4,
      },
      {
        id: 's8t9u0v123',
        productId: oil2.id,
        quantity: 2,
        price: 320,
        volume: 1,
      },
      {
        id: 'w1x2y3z123',
        productId: oil2.id,
        quantity: 1,
        price: 1500,
        volume: 5,
      },
      {
        id: 'b4c5d6e123',
        productId: oil3.id,
        quantity: 5,
        price: 600,
        volume: 1,
      },
      {
        id: 'f7g8h9i123',
        productId: oil3.id,
        quantity: 3,
        price: 2400,
        volume: 4,
      },

      // создаем вариации для остальных товаров (чтобы у каждого товара была цена)
      { id: 'j1k2l3m45', productId: d194002a.id, price: 10300, quantity: 1 },
      { id: 'n4o5p6q45', productId: p156002a.id, price: 6500, quantity: 2 },
      { id: 'r8s9t0u45', productId: d458004a.id, price: 3300, quantity: 3 },
      { id: 'v1w2x3y45', productId: s745002a.id, price: 3200, quantity: 4 },
      { id: 'a1b2c3d45', productId: a745012c.id, price: 5300, quantity: 5 },
      { id: 'e4f5g6h1', productId: d251010a.id, price: 7500, quantity: 6 },
      { id: 'i7j8k9l1', productId: a765010a.id, price: 500, quantity: 7 },
      { id: 'm1n2o3p1', productId: d96671.id, price: 2300, quantity: 8 },
      { id: 'q4r5s6t1', productId: a39679b.id, price: 15000, quantity: 9 },
      { id: 'u8v9w0x1', productId: a757420a.id, price: 27300, quantity: 10 },
      { id: 'y1z2a3b1', productId: d46420.id, price: 2600, quantity: 8 },
      { id: 'c4d5e6f1', productId: d663410a.id, price: 300, quantity: 2 },
      { id: 'g7h8i9j1', productId: f030.id, price: 23000, quantity: 7 },
      { id: 'k1l2m3n1', productId: d19740a.id, price: 27000, quantity: 4 },
      { id: 'o4p5q6r1', productId: d665740a.id, price: 33000, quantity: 6 },
      { id: 's8t9u0v1', productId: m465fk.id, price: 15000, quantity: 9 },
      { id: 'w1x2y3z1', productId: t55064.id, price: 7000, quantity: 1 },
      { id: 'b4c5d6e1', productId: jtc4921.id, price: 10000, quantity: 5 },
    ],
  });

  // создаем тестовые корзины
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
      { userId: 3, totalAmount: 0, token: '33333' },
      { userId: 4, totalAmount: 0, token: '44444' },
      { userId: 5, totalAmount: 0, token: '55555' },
      { userId: 6, totalAmount: 0, token: '66666' },
      { userId: 7, totalAmount: 0, token: '77777' },
      { userId: 8, totalAmount: 0, token: '88888' },
      { userId: 9, totalAmount: 0, token: '99999' },
      { userId: 10, totalAmount: 0, token: '10101' },
      { userId: 11, totalAmount: 0, token: '11111' },
      { userId: 12, totalAmount: 0, token: '12121' },
    ],
  });

  // в созданные корзины помещаем тестовые товары
  await prisma.cartItem.create({
    data: {
      productItemId: 'b4c5d6e123',
      cartId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 'oilutil010' }, { id: 'pack001' }],
      },
    },
  });
  await prisma.cartItem.create({
    data: {
      productItemId: 'n4o5p6q45',
      cartId: 2,
      quantity: 1,
      ingredients: {
        connect: [{ id: 'oilutil010' }, { id: 'pack002' }],
      },
    },
  });
  await prisma.cartItem.create({
    data: {
      productItemId: 'k1l2m3n1',
      cartId: 3,
      quantity: 3,
      ingredients: {
        connect: [{ id: 'oilutil010' }, { id: 'pack001' }],
      },
    },
  });
  await prisma.cartItem.create({
    data: {
      productItemId: 'k1l2m3n1',
      cartId: 4,
      quantity: 3,
      ingredients: {
        connect: [{ id: 'oilutil010' }, { id: 'pack001' }],
      },
    },
  });

  // создаем тестовые заказы
  await prisma.order.createMany({
    data: [
      {
        userId: 1,
        token: '11111',
        totalAmount: 10300,
        status: 'PENDING',
        fullName: 'John Doe',
        deliveryMethod: 'DELIVERY',
        email: 'john@example.com',
        phone: '+70000000000',
        address: 'Москва, ул. Айтишников, д. 10100',
        comment: 'test comment',
        items: JSON.stringify([
          {
            id: 2,
            cartId: 2,
            productItemId: 7,
            quantity: 1,
            createdAt: '2025-05-25T14:16:25.545Z',
            updatedAt: '2025-05-25T14:16:25.545Z',
            ingredients: [
              {
                id: 'oilutil010',
                name: 'Утилизация отработанного масла (до 10л)',
                price: 50,
                imageUrl: '../public/assets/images/ingredients/oilutil.png',
              },
              {
                id: 'pack002',
                name: 'Дополнительная упаковка от повреждений для транспортировки (большая)',
                price: 300,
                imageUrl: '../public/assets/images/ingredients/pack.png',
              },
            ],
            productItem: {
              id: 7,
              price: 600,
              quantity: 8,
              thickness: 1.5,
              quantityOfTeeth: 65,
              volume: null,
              productId: 20,
              product: {
                id: 20,
                name: 'Диск фрикционный',
                imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/05/l68116c_1.jpg',
                categoryId: 3,
                createdAt: '2025-05-25T14:16:02.008Z',
                updatedAt: '2025-05-25T14:16:02.008Z',
              },
            },
          },
          {
            id: 5,
            cartId: 2,
            productItemId: 18,
            quantity: 1,
            createdAt: '2025-05-25T15:17:03.286Z',
            updatedAt: '2025-05-25T15:17:03.286Z',
            ingredients: [],
            productItem: {
              id: 18,
              price: 3300,
              quantity: 3,
              thickness: null,
              quantityOfTeeth: null,
              volume: null,
              productId: 3,
              product: {
                id: 3,
                name: 'Ремкомплект с фрикционными дисками',
                imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/11/21/d458004a_1.jpg',
                categoryId: 1,
                createdAt: '2025-05-25T14:15:30.234Z',
                updatedAt: '2025-05-25T14:15:30.234Z',
              },
            },
          },
        ]),
      },
      {
        userId: 1,
        token: '11111',
        totalAmount: 10300,
        status: 'PENDING',
        fullName: 'John Doe 1',
        deliveryMethod: 'PICKUP',
        email: 'john1@example.com',
        phone: '+70000000000',
        address: 'Москва, ул. Айтишников, д. 10100',
        items: JSON.stringify([
          {
            id: 2,
            cartId: 2,
            productItemId: 7,
            quantity: 1,
            createdAt: '2025-05-25T14:16:25.545Z',
            updatedAt: '2025-05-25T14:16:25.545Z',
            ingredients: [
              {
                id: 'oilutil010',
                name: 'Утилизация отработанного масла (до 10л)',
                price: 50,
                imageUrl: '../public/assets/images/ingredients/oilutil.png',
              },
              {
                id: 'pack002',
                name: 'Дополнительная упаковка от повреждений для транспортировки (большая)',
                price: 300,
                imageUrl: '../public/assets/images/ingredients/pack.png',
              },
            ],
            productItem: {
              id: 7,
              price: 600,
              quantity: 8,
              thickness: 1.5,
              quantityOfTeeth: 65,
              volume: null,
              productId: 20,
              product: {
                id: 20,
                name: 'Диск фрикционный',
                imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/05/l68116c_1.jpg',
                categoryId: 3,
                createdAt: '2025-05-25T14:16:02.008Z',
                updatedAt: '2025-05-25T14:16:02.008Z',
              },
            },
          },
          {
            id: 5,
            cartId: 2,
            productItemId: 18,
            quantity: 1,
            createdAt: '2025-05-25T15:17:03.286Z',
            updatedAt: '2025-05-25T15:17:03.286Z',
            ingredients: [],
            productItem: {
              id: 18,
              price: 3300,
              quantity: 3,
              thickness: null,
              quantityOfTeeth: null,
              volume: null,
              productId: 3,
              product: {
                id: 3,
                name: 'Ремкомплект с фрикционными дисками',
                imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/11/21/d458004a_1.jpg',
                categoryId: 1,
                createdAt: '2025-05-25T14:15:30.234Z',
                updatedAt: '2025-05-25T14:15:30.234Z',
              },
            },
          },
        ]),
      },
      {
        userId: 2,
        token: '22222',
        totalAmount: 6500,
        status: 'CANCELED',
        fullName: 'Jane Doe 2',
        deliveryMethod: 'PICKUP',
        email: 'jane2@example.com',
        phone: '+70000000000',
        address: 'Москва, ул. Айтишников, д. 10100',
        items: JSON.stringify([
          {
            id: 2,
            cartId: 2,
            productItemId: 7,
            quantity: 1,
            createdAt: '2025-05-25T14:16:25.545Z',
            updatedAt: '2025-05-25T14:16:25.545Z',
            ingredients: [
              {
                id: 'oilutil010',
                name: 'Утилизация отработанного масла (до 10л)',
                price: 50,
                imageUrl: '../public/assets/images/ingredients/oilutil.png',
              },
              {
                id: 'pack002',
                name: 'Дополнительная упаковка от повреждений для транспортировки (большая)',
                price: 300,
                imageUrl: '../public/assets/images/ingredients/pack.png',
              },
            ],
            productItem: {
              id: 7,
              price: 600,
              quantity: 8,
              thickness: 1.5,
              quantityOfTeeth: 65,
              volume: null,
              productId: 20,
              product: {
                id: 20,
                name: 'Диск фрикционный',
                imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/05/l68116c_1.jpg',
                categoryId: 3,
                createdAt: '2025-05-25T14:16:02.008Z',
                updatedAt: '2025-05-25T14:16:02.008Z',
              },
            },
          },
          {
            id: 5,
            cartId: 2,
            productItemId: 18,
            quantity: 1,
            createdAt: '2025-05-25T15:17:03.286Z',
            updatedAt: '2025-05-25T15:17:03.286Z',
            ingredients: [],
            productItem: {
              id: 18,
              price: 3300,
              quantity: 3,
              thickness: null,
              quantityOfTeeth: null,
              volume: null,
              productId: 3,
              product: {
                id: 3,
                name: 'Ремкомплект с фрикционными дисками',
                imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/11/21/d458004a_1.jpg',
                categoryId: 1,
                createdAt: '2025-05-25T14:15:30.234Z',
                updatedAt: '2025-05-25T14:15:30.234Z',
              },
            },
          },
        ]),
      },
      {
        userId: 3,
        token: '33333',
        totalAmount: 3300,
        status: 'SUCCESS',
        paymentId: '12345',
        fullName: 'John Doe 3',
        deliveryMethod: 'DELIVERY',
        email: 'john3@example.com',
        phone: '+70000000000',
        address: 'Москва, ул. Айтишников, д. 10100',
        items: JSON.stringify([
          {
            id: 2,
            cartId: 2,
            productItemId: 7,
            quantity: 1,
            createdAt: '2025-05-25T14:16:25.545Z',
            updatedAt: '2025-05-25T14:16:25.545Z',
            ingredients: [
              {
                id: 'oilutil010',
                name: 'Утилизация отработанного масла (до 10л)',
                price: 50,
                imageUrl: '../public/assets/images/ingredients/oilutil.png',
              },
              {
                id: 'pack002',
                name: 'Дополнительная упаковка от повреждений для транспортировки (большая)',
                price: 300,
                imageUrl: '../public/assets/images/ingredients/pack.png',
              },
            ],
            productItem: {
              id: 7,
              price: 600,
              quantity: 8,
              thickness: 1.5,
              quantityOfTeeth: 65,
              volume: null,
              productId: 20,
              product: {
                id: 20,
                name: 'Диск фрикционный',
                imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/05/l68116c_1.jpg',
                categoryId: 3,
                createdAt: '2025-05-25T14:16:02.008Z',
                updatedAt: '2025-05-25T14:16:02.008Z',
              },
            },
          },
          {
            id: 5,
            cartId: 2,
            productItemId: 18,
            quantity: 1,
            createdAt: '2025-05-25T15:17:03.286Z',
            updatedAt: '2025-05-25T15:17:03.286Z',
            ingredients: [],
            productItem: {
              id: 18,
              price: 3300,
              quantity: 3,
              thickness: null,
              quantityOfTeeth: null,
              volume: null,
              productId: 3,
              product: {
                id: 3,
                name: 'Ремкомплект с фрикционными дисками',
                imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/11/21/d458004a_1.jpg',
                categoryId: 1,
                createdAt: '2025-05-25T14:15:30.234Z',
                updatedAt: '2025-05-25T14:15:30.234Z',
              },
            },
          },
        ]),
      },
      {
        userId: 4,
        token: '44444',
        totalAmount: 3200,
        status: 'SUCCESS',
        fullName: 'Jane Doe 4',
        deliveryMethod: 'DELIVERY',
        email: 'jane4@example.com',
        phone: '+70000000000',
        address: 'Москва, ул. Айтишников, д. 10100',
        items: JSON.stringify([
          {
            id: 2,
            cartId: 2,
            productItemId: 7,
            quantity: 1,
            createdAt: '2025-05-25T14:16:25.545Z',
            updatedAt: '2025-05-25T14:16:25.545Z',
            ingredients: [
              {
                id: 'oilutil010',
                name: 'Утилизация отработанного масла (до 10л)',
                price: 50,
                imageUrl: '../public/assets/images/ingredients/oilutil.png',
              },
              {
                id: 'pack002',
                name: 'Дополнительная упаковка от повреждений для транспортировки (большая)',
                price: 300,
                imageUrl: '../public/assets/images/ingredients/pack.png',
              },
            ],
            productItem: {
              id: 7,
              price: 600,
              quantity: 8,
              thickness: 1.5,
              quantityOfTeeth: 65,
              volume: null,
              productId: 20,
              product: {
                id: 20,
                name: 'Диск фрикционный',
                imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/05/l68116c_1.jpg',
                categoryId: 3,
                createdAt: '2025-05-25T14:16:02.008Z',
                updatedAt: '2025-05-25T14:16:02.008Z',
              },
            },
          },
          {
            id: 5,
            cartId: 2,
            productItemId: 18,
            quantity: 1,
            createdAt: '2025-05-25T15:17:03.286Z',
            updatedAt: '2025-05-25T15:17:03.286Z',
            ingredients: [],
            productItem: {
              id: 18,
              price: 3300,
              quantity: 3,
              thickness: null,
              quantityOfTeeth: null,
              volume: null,
              productId: 3,
              product: {
                id: 3,
                name: 'Ремкомплект с фрикционными дисками',
                imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/11/21/d458004a_1.jpg',
                categoryId: 1,
                createdAt: '2025-05-25T14:15:30.234Z',
                updatedAt: '2025-05-25T14:15:30.234Z',
              },
            },
          },
        ]),
      },
      {
        userId: 5,
        token: '55555',
        totalAmount: 5300,
        status: 'PROCESSING',
        fullName: 'John Doe 5',
        deliveryMethod: 'DELIVERY',
        email: 'john5@example.com',
        phone: '+70000000000',
        address: 'Москва, ул. Айтишников, д. 10100',
        items: JSON.stringify([
          {
            id: 2,
            cartId: 2,
            productItemId: 7,
            quantity: 1,
            createdAt: '2025-05-25T14:16:25.545Z',
            updatedAt: '2025-05-25T14:16:25.545Z',
            ingredients: [
              {
                id: 'oilutil010',
                name: 'Утилизация отработанного масла (до 10л)',
                price: 50,
                imageUrl: '../public/assets/images/ingredients/oilutil.png',
              },
              {
                id: 'pack002',
                name: 'Дополнительная упаковка от повреждений для транспортировки (большая)',
                price: 300,
                imageUrl: '../public/assets/images/ingredients/pack.png',
              },
            ],
            productItem: {
              id: 7,
              price: 600,
              quantity: 8,
              thickness: 1.5,
              quantityOfTeeth: 65,
              volume: null,
              productId: 20,
              product: {
                id: 20,
                name: 'Диск фрикционный',
                imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/05/l68116c_1.jpg',
                categoryId: 3,
                createdAt: '2025-05-25T14:16:02.008Z',
                updatedAt: '2025-05-25T14:16:02.008Z',
              },
            },
          },
          {
            id: 5,
            cartId: 2,
            productItemId: 18,
            quantity: 1,
            createdAt: '2025-05-25T15:17:03.286Z',
            updatedAt: '2025-05-25T15:17:03.286Z',
            ingredients: [],
            productItem: {
              id: 18,
              price: 3300,
              quantity: 3,
              thickness: null,
              quantityOfTeeth: null,
              volume: null,
              productId: 3,
              product: {
                id: 3,
                name: 'Ремкомплект с фрикционными дисками',
                imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/11/21/d458004a_1.jpg',
                categoryId: 1,
                createdAt: '2025-05-25T14:15:30.234Z',
                updatedAt: '2025-05-25T14:15:30.234Z',
              },
            },
          },
        ]),
      },
      {
        userId: 6,
        token: '612345',
        totalAmount: 5300,
        status: 'CANCELED',
        fullName: 'Jane Doe 6',
        deliveryMethod: 'DELIVERY',
        email: 'jane6@example.com',
        phone: '+70000000000',
        address: 'Москва, ул. Айтишников, д. 10100',
        items: JSON.stringify([
          {
            id: 2,
            cartId: 2,
            productItemId: 7,
            quantity: 1,
            createdAt: '2025-05-25T14:16:25.545Z',
            updatedAt: '2025-05-25T14:16:25.545Z',
            ingredients: [
              {
                id: 'oilutil010',
                name: 'Утилизация отработанного масла (до 10л)',
                price: 50,
                imageUrl: '../public/assets/images/ingredients/oilutil.png',
              },
              {
                id: 'pack002',
                name: 'Дополнительная упаковка от повреждений для транспортировки (большая)',
                price: 300,
                imageUrl: '../public/assets/images/ingredients/pack.png',
              },
            ],
            productItem: {
              id: 7,
              price: 600,
              quantity: 8,
              thickness: 1.5,
              quantityOfTeeth: 65,
              volume: null,
              productId: 20,
              product: {
                id: 20,
                name: 'Диск фрикционный',
                imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/05/l68116c_1.jpg',
                categoryId: 3,
                createdAt: '2025-05-25T14:16:02.008Z',
                updatedAt: '2025-05-25T14:16:02.008Z',
              },
            },
          },
          {
            id: 5,
            cartId: 2,
            productItemId: 18,
            quantity: 1,
            createdAt: '2025-05-25T15:17:03.286Z',
            updatedAt: '2025-05-25T15:17:03.286Z',
            ingredients: [],
            productItem: {
              id: 18,
              price: 3300,
              quantity: 3,
              thickness: null,
              quantityOfTeeth: null,
              volume: null,
              productId: 3,
              product: {
                id: 3,
                name: 'Ремкомплект с фрикционными дисками',
                imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/11/21/d458004a_1.jpg',
                categoryId: 1,
                createdAt: '2025-05-25T14:15:30.234Z',
                updatedAt: '2025-05-25T14:15:30.234Z',
              },
            },
          },
        ]),
      },
      {
        userId: 7,
        token: '77777',
        totalAmount: 5300,
        status: 'SUCCESS',
        fullName: 'John Doe 7',
        deliveryMethod: 'DELIVERY',
        email: 'john7@example.com',
        phone: '+70000000000',
        address: 'Москва, ул. Айтишников, д. 10100',
        items: JSON.stringify([
          {
            id: 2,
            cartId: 2,
            productItemId: 7,
            quantity: 1,
            createdAt: '2025-05-25T14:16:25.545Z',
            updatedAt: '2025-05-25T14:16:25.545Z',
            ingredients: [
              {
                id: 'oilutil010',
                name: 'Утилизация отработанного масла (до 10л)',
                price: 50,
                imageUrl: '../public/assets/images/ingredients/oilutil.png',
              },
              {
                id: 'pack002',
                name: 'Дополнительная упаковка от повреждений для транспортировки (большая)',
                price: 300,
                imageUrl: '../public/assets/images/ingredients/pack.png',
              },
            ],
            productItem: {
              id: 7,
              price: 600,
              quantity: 8,
              thickness: 1.5,
              quantityOfTeeth: 65,
              volume: null,
              productId: 20,
              product: {
                id: 20,
                name: 'Диск фрикционный',
                imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/05/l68116c_1.jpg',
                categoryId: 3,
                createdAt: '2025-05-25T14:16:02.008Z',
                updatedAt: '2025-05-25T14:16:02.008Z',
              },
            },
          },
          {
            id: 5,
            cartId: 2,
            productItemId: 18,
            quantity: 1,
            createdAt: '2025-05-25T15:17:03.286Z',
            updatedAt: '2025-05-25T15:17:03.286Z',
            ingredients: [],
            productItem: {
              id: 18,
              price: 3300,
              quantity: 3,
              thickness: null,
              quantityOfTeeth: null,
              volume: null,
              productId: 3,
              product: {
                id: 3,
                name: 'Ремкомплект с фрикционными дисками',
                imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/11/21/d458004a_1.jpg',
                categoryId: 1,
                createdAt: '2025-05-25T14:15:30.234Z',
                updatedAt: '2025-05-25T14:15:30.234Z',
              },
            },
          },
        ]),
      },
      {
        userId: 8,
        token: '88888',
        totalAmount: 5300,
        status: 'SUCCESS',
        fullName: 'Jane Doe 8',
        deliveryMethod: 'DELIVERY',
        email: 'jane8@example.com',
        phone: '+70000000000',
        address: 'Москва, ул. Айтишников, д. 10100',
        items: JSON.stringify([
          {
            id: 2,
            cartId: 2,
            productItemId: 7,
            quantity: 1,
            createdAt: '2025-05-25T14:16:25.545Z',
            updatedAt: '2025-05-25T14:16:25.545Z',
            ingredients: [
              {
                id: 'oilutil010',
                name: 'Утилизация отработанного масла (до 10л)',
                price: 50,
                imageUrl: '../public/assets/images/ingredients/oilutil.png',
              },
              {
                id: 'pack002',
                name: 'Дополнительная упаковка от повреждений для транспортировки (большая)',
                price: 300,
                imageUrl: '../public/assets/images/ingredients/pack.png',
              },
            ],
            productItem: {
              id: 7,
              price: 600,
              quantity: 8,
              thickness: 1.5,
              quantityOfTeeth: 65,
              volume: null,
              productId: 20,
              product: {
                id: 20,
                name: 'Диск фрикционный',
                imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/05/l68116c_1.jpg',
                categoryId: 3,
                createdAt: '2025-05-25T14:16:02.008Z',
                updatedAt: '2025-05-25T14:16:02.008Z',
              },
            },
          },
          {
            id: 5,
            cartId: 2,
            productItemId: 18,
            quantity: 1,
            createdAt: '2025-05-25T15:17:03.286Z',
            updatedAt: '2025-05-25T15:17:03.286Z',
            ingredients: [],
            productItem: {
              id: 18,
              price: 3300,
              quantity: 3,
              thickness: null,
              quantityOfTeeth: null,
              volume: null,
              productId: 3,
              product: {
                id: 3,
                name: 'Ремкомплект с фрикционными дисками',
                imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/11/21/d458004a_1.jpg',
                categoryId: 1,
                createdAt: '2025-05-25T14:15:30.234Z',
                updatedAt: '2025-05-25T14:15:30.234Z',
              },
            },
          },
        ]),
      },
      {
        userId: 9,
        token: '99999',
        totalAmount: 5300,
        status: 'SUCCESS',
        fullName: 'John Doe 9',
        deliveryMethod: 'DELIVERY',
        email: 'john9@example.com',
        phone: '+70000000000',
        address: 'Москва, ул. Айтишников, д. 10100',
        items: JSON.stringify([
          {
            id: 2,
            cartId: 2,
            productItemId: 7,
            quantity: 1,
            createdAt: '2025-05-25T14:16:25.545Z',
            updatedAt: '2025-05-25T14:16:25.545Z',
            ingredients: [
              {
                id: 'oilutil010',
                name: 'Утилизация отработанного масла (до 10л)',
                price: 50,
                imageUrl: '../public/assets/images/ingredients/oilutil.png',
              },
              {
                id: 'pack002',
                name: 'Дополнительная упаковка от повреждений для транспортировки (большая)',
                price: 300,
                imageUrl: '../public/assets/images/ingredients/pack.png',
              },
            ],
            productItem: {
              id: 7,
              price: 600,
              quantity: 8,
              thickness: 1.5,
              quantityOfTeeth: 65,
              volume: null,
              productId: 20,
              product: {
                id: 20,
                name: 'Диск фрикционный',
                imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/05/l68116c_1.jpg',
                categoryId: 3,
                createdAt: '2025-05-25T14:16:02.008Z',
                updatedAt: '2025-05-25T14:16:02.008Z',
              },
            },
          },
          {
            id: 5,
            cartId: 2,
            productItemId: 18,
            quantity: 1,
            createdAt: '2025-05-25T15:17:03.286Z',
            updatedAt: '2025-05-25T15:17:03.286Z',
            ingredients: [],
            productItem: {
              id: 18,
              price: 3300,
              quantity: 3,
              thickness: null,
              quantityOfTeeth: null,
              volume: null,
              productId: 3,
              product: {
                id: 3,
                name: 'Ремкомплект с фрикционными дисками',
                imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/11/21/d458004a_1.jpg',
                categoryId: 1,
                createdAt: '2025-05-25T14:15:30.234Z',
                updatedAt: '2025-05-25T14:15:30.234Z',
              },
            },
          },
        ]),
      },
      {
        userId: 10,
        token: '101010',
        totalAmount: 5300,
        status: 'SUCCESS',
        fullName: 'Jane Doe 10',
        deliveryMethod: 'DELIVERY',
        email: 'jane10@example.com',
        phone: '+70000000000',
        address: 'Москва, ул. Айтишников, д. 10100',
        items: JSON.stringify([
          {
            id: 2,
            cartId: 2,
            productItemId: 7,
            quantity: 1,
            createdAt: '2025-05-25T14:16:25.545Z',
            updatedAt: '2025-05-25T14:16:25.545Z',
            ingredients: [
              {
                id: 'oilutil010',
                name: 'Утилизация отработанного масла (до 10л)',
                price: 50,
                imageUrl: '../public/assets/images/ingredients/oilutil.png',
              },
              {
                id: 'pack002',
                name: 'Дополнительная упаковка от повреждений для транспортировки (большая)',
                price: 300,
                imageUrl: '../public/assets/images/ingredients/pack.png',
              },
            ],
            productItem: {
              id: 7,
              price: 600,
              quantity: 8,
              thickness: 1.5,
              quantityOfTeeth: 65,
              volume: null,
              productId: 20,
              product: {
                id: 20,
                name: 'Диск фрикционный',
                imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/05/l68116c_1.jpg',
                categoryId: 3,
                createdAt: '2025-05-25T14:16:02.008Z',
                updatedAt: '2025-05-25T14:16:02.008Z',
              },
            },
          },
          {
            id: 5,
            cartId: 2,
            productItemId: 18,
            quantity: 1,
            createdAt: '2025-05-25T15:17:03.286Z',
            updatedAt: '2025-05-25T15:17:03.286Z',
            ingredients: [],
            productItem: {
              id: 18,
              price: 3300,
              quantity: 3,
              thickness: null,
              quantityOfTeeth: null,
              volume: null,
              productId: 3,
              product: {
                id: 3,
                name: 'Ремкомплект с фрикционными дисками',
                imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/11/21/d458004a_1.jpg',
                categoryId: 1,
                createdAt: '2025-05-25T14:15:30.234Z',
                updatedAt: '2025-05-25T14:15:30.234Z',
              },
            },
          },
        ]),
      },
      {
        userId: 11,
        token: '111111',
        totalAmount: 5300,
        status: 'PROCESSING',
        fullName: 'John Doe 11',
        deliveryMethod: 'DELIVERY',
        email: 'john11@example.com',
        phone: '+70000000000',
        address: 'Москва, ул. Айтишников, д. 10100',
        items: JSON.stringify([
          {
            id: 2,
            cartId: 2,
            productItemId: 7,
            quantity: 1,
            createdAt: '2025-05-25T14:16:25.545Z',
            updatedAt: '2025-05-25T14:16:25.545Z',
            ingredients: [
              {
                id: 'oilutil010',
                name: 'Утилизация отработанного масла (до 10л)',
                price: 50,
                imageUrl: '../public/assets/images/ingredients/oilutil.png',
              },
              {
                id: 'pack002',
                name: 'Дополнительная упаковка от повреждений для транспортировки (большая)',
                price: 300,
                imageUrl: '../public/assets/images/ingredients/pack.png',
              },
            ],
            productItem: {
              id: 7,
              price: 600,
              quantity: 8,
              thickness: 1.5,
              quantityOfTeeth: 65,
              volume: null,
              productId: 20,
              product: {
                id: 20,
                name: 'Диск фрикционный',
                imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/05/l68116c_1.jpg',
                categoryId: 3,
                createdAt: '2025-05-25T14:16:02.008Z',
                updatedAt: '2025-05-25T14:16:02.008Z',
              },
            },
          },
          {
            id: 5,
            cartId: 2,
            productItemId: 18,
            quantity: 1,
            createdAt: '2025-05-25T15:17:03.286Z',
            updatedAt: '2025-05-25T15:17:03.286Z',
            ingredients: [],
            productItem: {
              id: 18,
              price: 3300,
              quantity: 3,
              thickness: null,
              quantityOfTeeth: null,
              volume: null,
              productId: 3,
              product: {
                id: 3,
                name: 'Ремкомплект с фрикционными дисками',
                imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/11/21/d458004a_1.jpg',
                categoryId: 1,
                createdAt: '2025-05-25T14:15:30.234Z',
                updatedAt: '2025-05-25T14:15:30.234Z',
              },
            },
          },
        ]),
      },
      {
        userId: 12,
        token: '121212',
        totalAmount: 5300,
        status: 'PROCESSING',
        fullName: 'Jane Doe 12',
        deliveryMethod: 'DELIVERY',
        email: 'jane12@example.com',
        phone: '+70000000000',
        address: 'Москва, ул. Айтишников, д. 10100',
        items: JSON.stringify([
          {
            id: 2,
            cartId: 2,
            productItemId: 7,
            quantity: 1,
            createdAt: '2025-05-25T14:16:25.545Z',
            updatedAt: '2025-05-25T14:16:25.545Z',
            ingredients: [
              {
                id: 'oilutil010',
                name: 'Утилизация отработанного масла (до 10л)',
                price: 50,
                imageUrl: '../public/assets/images/ingredients/oilutil.png',
              },
              {
                id: 'pack002',
                name: 'Дополнительная упаковка от повреждений для транспортировки (большая)',
                price: 300,
                imageUrl: '../public/assets/images/ingredients/pack.png',
              },
            ],
            productItem: {
              id: 7,
              price: 600,
              quantity: 8,
              thickness: 1.5,
              quantityOfTeeth: 65,
              volume: null,
              productId: 20,
              product: {
                id: 20,
                name: 'Диск фрикционный',
                imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/01/05/l68116c_1.jpg',
                categoryId: 3,
                createdAt: '2025-05-25T14:16:02.008Z',
                updatedAt: '2025-05-25T14:16:02.008Z',
              },
            },
          },
          {
            id: 5,
            cartId: 2,
            productItemId: 18,
            quantity: 1,
            createdAt: '2025-05-25T15:17:03.286Z',
            updatedAt: '2025-05-25T15:17:03.286Z',
            ingredients: [],
            productItem: {
              id: 18,
              price: 3300,
              quantity: 3,
              thickness: null,
              quantityOfTeeth: null,
              volume: null,
              productId: 3,
              product: {
                id: 3,
                name: 'Ремкомплект с фрикционными дисками',
                imageUrl: 'https://at-cvt.com/wp-content/uploads/2021/11/21/d458004a_1.jpg',
                categoryId: 1,
                createdAt: '2025-05-25T14:15:30.234Z',
                updatedAt: '2025-05-25T14:15:30.234Z',
              },
            },
          },
        ]),
      },
    ],
  });
}

// удаление тестовых данных
async function down() {
  // если запустить скрипт ниже, то счетчики id не обнулятся
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
