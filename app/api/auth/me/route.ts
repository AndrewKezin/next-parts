import { getUserSession } from '@/lib/get-user-session';
import { prisma } from '@/prisma/prisma-client';
import { UserWithAddresses } from '@/services/dto/cart.dto';
import { NextRequest, NextResponse } from 'next/server';

// это нужно для асинхронного getUserSession
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, res: any) {
  try {
    // получить сессию пользователя на сервере (если пользователь не авторизован, то он не получит никаких данных)
    // !!! если деплой с getUserSession не пойдет, то нужно использовать getServerSession(req, res, authOptions)
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
        id: true,
        role: true,
        addresses: true,
      },
    });

    return NextResponse.json(data as UserWithAddresses);
  } catch (err) {
    console.log('[AUTH_ME] Error', err);
    return NextResponse.json({ message: '[AUTH_ME] Error' }, { status: 401 });
  }
}
