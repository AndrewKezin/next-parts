import { prisma } from '@/prisma/prisma-client';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
    try {
        const session = await getServerSession(authOptions);
    
        if (!session) {
          return NextResponse.json({ message: 'Вы не авторизованы' }, { status: 401 });
        }
    
        if (session.user.role !== 'ADMIN') {
          return NextResponse.json({ message: 'Недостаточно прав' }, { status: 403 });
        }
    
        const user = await prisma.user.findFirst({
            where: {
                id: Number(params.id),
            }
        });

        return NextResponse.json(user);
      } catch (err) {
        console.log('[GET_USERS] Error', err);
        return NextResponse.json({ message: '[GET_USERS] Error' }, { status: 500 });
      }
}