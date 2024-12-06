import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

// роутами мы отлавливаем запросы
// GET-запрос на api/users
export async function GET() {
  const users = await prisma.user.findMany();

  return NextResponse.json(users);
}

// POST-запрос на создание пользователя. Вытаскиваем запрос, он типизируется с помощью NextRequest
export async function POST(req: NextRequest) {
  // вытвскиваем данные из запроса
  const data = await req.json();

  // передаем эти данные в призму и создаем пользователя
  const user = await prisma.user.create({ data });

  // когда пользователь создан, возвращаем его
  return NextResponse.json(user);
}
