import { DeleteUserTemplate } from '@/components/shared';
import { sendEmail } from '@/lib';
import { getUserSession } from '@/lib/get-user-session';
import { prisma } from '@/prisma/prisma-client';
import { UserStatus } from '@prisma/client';
import { compareSync } from 'bcrypt';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

// роутами мы отлавливаем запросы на api/users
// GET-запрос на получение всех пользователей для админки
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Вы не авторизованы' }, { status: 401 });
    }

    if (session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Недостаточно прав' }, { status: 403 });
    }

    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json(users);
  } catch (err) {
    console.log(err);
    return NextResponse.json({message: '[GET_USERS] Error'}, {status: 500});
  }
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

// DELETE-запрос на удаление своего аккаунта пользователем
export async function DELETE(req: NextRequest) {
  const data = (await req.json()) as { password: string };

  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      return NextResponse.json({ error: 'Вы не аторизованы' });
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    if (!findUser) {
      return NextResponse.json({ error: 'Пользователь не найден' });
    }

    if (findUser.status !== UserStatus.ACTIVE) {
      return NextResponse.json({
        error:
          'На вашем аккаунте блокировка или имеется задолженность. Обратитесь в службу поддержки.',
      });
    }

    if (!compareSync(data.password, findUser.password)) {
      return NextResponse.json({ error: 'Неверный пароль' });
    }

    await prisma.user.update({
      where: {
        id: Number(findUser.id),
      },
      data: {
        status: UserStatus.DELETED,
        verified: null,
        provider: null,
        providerId: null,
        password: '',
        email: '',
      },
    });

    // отправить email об удалении аккаунта
    // await sendEmail(findUser.email, 'NEXT PARTS - Удаление аккаунта', DeleteUserTemplate({}));

    return NextResponse.json({ message: 'Ваша учетная запись удалена' });
  } catch (err) {
    console.log('[DeleteUserInfo] error: ', err);
    return NextResponse.json(
      {
        error:
          'Ошибка при удалении учетной записи пользователя. Убедитесь, что пароль введен правильно и повторите попытку.',
      },
      { status: 500 },
    );
  }
}
