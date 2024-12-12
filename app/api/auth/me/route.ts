import { getUserSession } from '@/lib/get-user-session';
import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // получить сессию пользователя на сервере (если пользователь не авторизован, то он не получит никаких данных)
    const user = await getUserSession();

    if (!user) {
      return NextResponse.json({ message: 'Вы не авторизованы' }, { status: 401 });
    }

    const data = await prisma.user.findUnique({
      where: {
        id: Number(user.id),
      },
      select: {
        fullName: true,
        email: true,
        password: false,
        phone: true,
        address: true,
        id: true,
        role: true,
      },
    });

    return NextResponse.json(data);
  } catch (err) {
    console.log('[AUTH_ME] Error', err);
    return NextResponse.json({ message: '[AUTH_ME] Error' }, { status: 401 });
  }
}
