import { prisma } from '@/prisma/prisma-client';
import { UserStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // вытаскиваем код из адресной строки
    const code = req.nextUrl.searchParams.get('code');

    if (!code) {
      return NextResponse.json({ error: 'Код подтверждения не найден' }, { status: 400 });
    }

    // поиск кода в БД
    const verificationCode = await prisma.verificationCode.findFirst({
      where: {
        code,
      },
    });

    if (!verificationCode) {
      return NextResponse.json({ error: 'Код подтверждения не найден' }, { status: 400 });
    }

    // обновление статуса пользователя
    await prisma.user.update({
      where: {
        id: verificationCode.userId,
      },
      data: {
        verified: new Date(),
        status: UserStatus.ACTIVE,
      },
    });

    // вытаскиваем email и пароль пользователя, чтобы авторизовать пользователя
    const findUser = await prisma.user.findFirst({
      where: {
        id: verificationCode.userId,
      },
      select: {
        email: true,
        password: true,
      }
    });

    if (!findUser) {
      return NextResponse.json({ error: 'Пользователь не найден' }, { status: 400 });
    }

    // !!!доделать автоматическую авторизацию пользователя после подтверждения кода

    
    // удаление кода из БД
    await prisma.verificationCode.delete({
      where: {
        id: verificationCode.id,
      },
    });

    return NextResponse.redirect(new URL('/?verified', req.url));
  } catch (err) {
    console.error(err);
    console.log('[VERIFY_GET] Error', err);
  }
}
