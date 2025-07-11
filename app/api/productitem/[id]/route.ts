import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
// import { authOptions } from '../../auth/[...nextauth]/route';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/prisma/prisma-client';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Вы не авторизованы!' }, { status: 401 });
    }

    const data = await prisma.productItem.findFirst({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(data);
  } catch (err) {
    console.log('[GET_PRODUCTITEMS] Error', err);
    return NextResponse.json({ message: '[GET_PRODUCTITEM] Error' }, { status: 500 });
  }
}
